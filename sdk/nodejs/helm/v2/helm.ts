// Copyright 2016-2019, Kulado Corporation.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as kulado from "@kulado/kulado";
import { execSync } from "child_process";
import * as fs from "fs";
import * as jsyaml from "js-yaml";
import * as nodepath from "path";
import * as shell from "shell-quote";
import * as tmp from "tmp";
import * as path from "../../path";
import * as yaml from "../../yaml/index";

interface BaseChartOpts {
    /**
     * The optional namespace to install chart resources into.
     */
    namespace?: kulado.Input<string>;
    /**
     * Overrides for chart values.
     */
    values?: kulado.Inputs;
    /**
     * Optional array of transformations to apply to resources that will be created by this chart prior to
     * creation. Allows customization of the chart behaviour without directly modifying the chart itself.
     */
    transformations?: ((o: any, opts: kulado.CustomResourceOptions) => void)[];

    /**
     * An optional prefix for the auto-generated resource names.
     * Example: A resource created with resourcePrefix="foo" would produce a resource named "foo-resourceName".
     */
    resourcePrefix?: string
}

export interface ChartOpts extends BaseChartOpts {
    /**
     * The repository containing the desired chart.  If not provided, [chart] must be a fully qualified chart URL
     * or repo/chartname.
     */
    repo?: kulado.Input<string>;
    /**
     * The chart to deploy.  If [repo] is provided, this chart name is looked up in the given repository.  Else
     * this chart name must be a fully qualified chart URL or `repo/chartname`.
     */
    chart: kulado.Input<string>;
    /**
     * The version of the chart to deploy. If not provided, the latest version will be deployed.
     */
    version?: kulado.Input<string>;

    /**
     * Additional options to customize the fetching of the Helm chart.
     */
    fetchOpts?: kulado.Input<FetchOpts>;
}

function isChartOpts(o: any): o is ChartOpts {
    return "chart" in o;
}

export interface LocalChartOpts extends BaseChartOpts {
    /**
     * The path to the chart directory which contains the `Chart.yaml` file.
     */
    path: string;
}

function isLocalChartOpts(o: any): o is LocalChartOpts {
    return "path" in o;
}

/**
 * Chart is a component representing a collection of resources described by an arbitrary Helm
 * Chart. The Chart can be fetched from any source that is accessible to the `helm` command
 * line. Values in the `values.yml` file can be overridden using `ChartOpts.values` (equivalent
 * to `--set` or having multiple `values.yml` files). Objects can be transformed arbitrarily by
 * supplying callbacks to `ChartOpts.transformations`.
 *
 * `Chart` does not use Tiller. The Chart specified is copied and expanded locally; any values
 * that would be retrieved in-cluster would be assigned fake values, and none of Tiller's
 * server-side validity testing is executed.
 *
 * The semantics of `update` on a Chart are identical to those of Helm and kubectl; for example,
 * unlike a "normal" Kulado program, updating a ConfigMap does not trigger a cascading update
 * among Deployments that reference it.
 *
 * NOTE: `Chart` will attempt to sort the resources in the same way that Helm does, to ensure
 * that (e.g.) namespaces are created before things that are in them. But, because the Kulado
 * engine delivers the these calls asynchronously, they could arrive "somewhat" out of order.
 * This should not affect many Helm charts.
 */
export class Chart extends yaml.CollectionComponentResource {
    /**
     * Create an instance of the specified Helm chart.
     * @param releaseName Name of the Chart (e.g., nginx-ingress).
     * @param config Configuration options for the Chart.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(
        releaseName: string,
        config: ChartOpts | LocalChartOpts,
        opts?: kulado.ComponentResourceOptions
    ) {
        if (config.resourcePrefix !== undefined) {
            releaseName = `${config.resourcePrefix}-${releaseName}`
        }
        super("kubernetes:helm.sh/v2:Chart", releaseName, config, opts);

        const allConfig = kulado.output(config);
        const configDeps = Array.from(<Set<kulado.Resource>>(<any>allConfig).resources());

        (<any>allConfig).isKnown.then((isKnown: boolean) => {
            if (!isKnown) {
                // Note that this can only happen during a preview.
                kulado.log.info("[Can't preview] all chart values must be known ahead of time to generate an accurate preview.", this);
            }
        });

        this.resources = allConfig.apply(cfg => {
            // Create temporary directories and files to hold chart data and override values.
            const overrides = tmp.fileSync({ postfix: ".yaml" });
            const chartDir = tmp.dirSync({ unsafeCleanup: true });

            try {
                let chart: string;
                let defaultValues: string;
                if (isChartOpts(cfg)) {
                    // Fetch chart.
                    const chartToFetch = cfg.repo ? `${cfg.repo}/${cfg.chart}` : cfg.chart;
                    const fetchOpts = Object.assign({}, cfg.fetchOpts, {
                        destination: chartDir.name,
                        version: cfg.version
                    });
                    fetch(chartToFetch, fetchOpts);
                    const fetchedChartName = fs.readdirSync(chartDir.name)[0];
                    chart = path.quotePath(nodepath.join(chartDir.name, fetchedChartName));
                    defaultValues = path.quotePath(
                        nodepath.join(chartDir.name, fetchedChartName, "values.yaml")
                    );
                } else {
                    chart = path.quotePath(cfg.path);
                    defaultValues = path.quotePath(nodepath.join(chart, "values.yaml"));
                }

                // Write overrides file.
                const data = JSON.stringify(cfg.values || {}, undefined, "  ");
                fs.writeFileSync(overrides.name, data);

                // Does not require Tiller. From the `helm template` documentation:
                //
                // >  Render chart templates locally and display the output.
                // >
                // > This does not require Tiller. However, any values that would normally be
                // > looked up or retrieved in-cluster will be faked locally. Additionally, none
                // > of the server-side testing of chart validity (e.g. whether an API is supported)
                // > is done.
                const release = shell.quote([releaseName]);
                const values = path.quotePath(overrides.name);
                const namespaceArg = cfg.namespace
                    ? `--namespace ${shell.quote([cfg.namespace])}`
                    : "";
                const yamlStream = execSync(
                    `helm template ${chart} --name ${release} --values ${defaultValues} --values ${values} ${namespaceArg}`
                ).toString();
                return this.parseTemplate(yamlStream, cfg.transformations, cfg.resourcePrefix, configDeps);
            } catch (e) {
                // Shed stack trace, only emit the error.
                throw new kulado.RunError(e.toString());
            } finally {
                // Clean up temporary files and directories.
                chartDir.removeCallback();
                overrides.removeCallback();
            }
        });
    }

    parseTemplate(
        yamlStream: string,
        transformations: ((o: any, opts: kulado.CustomResourceOptions) => void)[] | undefined,
        resourcePrefix: string | undefined,
        dependsOn: kulado.Resource[],
    ): kulado.Output<{ [key: string]: kulado.CustomResource }> {
        // NOTE: We must manually split the YAML stream because of js-yaml#456. Perusing the
        // code and the spec, it looks like a YAML stream is delimited by `^---`, though it is
        // difficult to know for sure.
        //
        // NOTE: We use `{json: true}` here so that we conform to Helm's YAML parsing
        // semantics. Specifically, a duplicate key overrides its predecessory, rather than
        // throwing an exception.
        const objs = yamlStream.split(/^---/m)
            .map(yaml => jsyaml.safeLoad(yaml, {json: true}))
            .filter(a => a != null && "kind" in a)
            .sort(helmSort);
        return yaml.parse(
            {
                resourcePrefix: resourcePrefix,
                yaml: objs.map(o => jsyaml.safeDump(o)),
                transformations: transformations || [],
            },
            { parent: this, dependsOn: dependsOn }
        );
    }
}

// helmSort is a JavaScript implementation of the Helm Kind sorter[1]. It provides a
// best-effort topology of Kubernetes kinds, which in most cases should ensure that resources
// that must be created first, are.
//
// [1]: https://github.com/helm/helm/blob/094b97ab5d7e2f6eda6d0ab0f2ede9cf578c003c/pkg/tiller/kind_sorter.go
/** @ignore */ export function helmSort(a: { kind: string }, b: { kind: string }): number {
    const installOrder = [
        "Namespace",
        "ResourceQuota",
        "LimitRange",
        "PodSecurityPolicy",
        "Secret",
        "ConfigMap",
        "StorageClass",
        "PersistentVolume",
        "PersistentVolumeClaim",
        "ServiceAccount",
        "CustomResourceDefinition",
        "ClusterRole",
        "ClusterRoleBinding",
        "Role",
        "RoleBinding",
        "Service",
        "DaemonSet",
        "Pod",
        "ReplicationController",
        "ReplicaSet",
        "Deployment",
        "StatefulSet",
        "Job",
        "CronJob",
        "Ingress",
        "APIService"
    ];

    const ordering: { [key: string]: number } = {};
    installOrder.forEach((_, i) => {
        ordering[installOrder[i]] = i;
    });

    const aKind = a["kind"];
    const bKind = b["kind"];

    if (!(aKind in ordering) && !(bKind in ordering)) {
        return aKind.localeCompare(bKind);
    }

    if (!(aKind in ordering)) {
        return 1;
    }

    if (!(bKind in ordering)) {
        return -1;
    }

    return ordering[aKind] - ordering[bKind];
}

/**
 * Additional options to customize the fetching of the Helm chart.
 */
export interface FetchOpts {
    /** Specific version of a chart. Without this, the latest version is fetched. */
    version?: kulado.Input<string>;

    /** Verify certificates of HTTPS-enabled servers using this CA bundle. */
    caFile?: kulado.Input<string>;

    /** Identify HTTPS client using this SSL certificate file. */
    certFile?: kulado.Input<string>;

    /** Identify HTTPS client using this SSL key file. */
    keyFile?: kulado.Input<string>;

    /**
     * Location to write the chart. If this and tardir are specified, tardir is appended to this
     * (default ".").
     */
    destination?: kulado.Input<string>;

    /** Keyring containing public keys (default "/Users/alex/.gnupg/pubring.gpg"). */
    keyring?: kulado.Input<string>;

    /** Chart repository password. */
    password?: kulado.Input<string>;

    /** Chart repository url where to locate the requested chart. */
    repo?: kulado.Input<string>;

    /**
     * If untar is specified, this flag specifies the name of the directory into which the chart is
     * expanded (default ".").
     */
    untardir?: kulado.Input<string>;

    /** Chart repository username. */
    username?: kulado.Input<string>;

    /** Location of your Helm config. Overrides $HELM_HOME (default "/Users/alex/.helm"). */
    home?: kulado.Input<string>;

    /**
     * Use development versions, too. Equivalent to version '>0.0.0-0'. If --version is set, this is
     * ignored.
     */
    devel?: kulado.Input<boolean>;

    /** Fetch the provenance file, but don't perform verification. */
    prov?: kulado.Input<boolean>;

    /** If set to false, will leave the chart as a tarball after downloading. */
    untar?: kulado.Input<boolean>;

    /** Verify the package against its signature. */
    verify?: kulado.Input<boolean>;
}

interface ResolvedFetchOpts {
    version?: string;
    caFile?: string;
    certFile?: string;
    keyFile?: string;
    destination?: string;
    keyring?: string;
    password?: string;
    repo?: string;
    untardir?: string;
    username?: string;
    home?: string;
    devel?: boolean;
    prov?: boolean;
    untar?: boolean;
    verify?: boolean;
}

/**
 * Retrieve a package from a package repository, and download it locally.
 *
 * This is useful for fetching packages to inspect, modify, or repackage. It can also be used to
 * perform cryptographic verification of a chart without installing the chart.
 *
 * There are options for unpacking the chart after download. This will create a directory for the
 * chart and uncompress into that directory.
 *
 * If the `verify` option is specified, the requested chart MUST have a provenance file, and MUST
 * pass the verification process. Failure in any part of this will result in an error, and the chart
 * will not be saved locally.
 */
export function fetch(chart: string, opts?: ResolvedFetchOpts) {
    const flags: string[] = [];
    if (opts !== undefined) {
        // Untar by default.
        if(opts.untar !== false) { flags.push(`--untar`); }

        // For arguments that are not paths to files, it is sufficent to use shell.quote to quote the arguments.
        // However, for arguments that are actual paths to files we use path.quotePath (note that path here is
        // not the node path builtin module). This ensures proper escaping of paths on Windows.
        if (opts.version !== undefined)     { flags.push(`--version ${shell.quote([opts.version])}`);    }
        if (opts.caFile !== undefined)      { flags.push(`--ca-file ${path.quotePath(opts.caFile)}`);          }
        if (opts.certFile !== undefined)    { flags.push(`--cert-file ${path.quotePath(opts.certFile)}`);      }
        if (opts.keyFile !== undefined)     { flags.push(`--key-file ${path.quotePath(opts.keyFile)}`);        }
        if (opts.destination !== undefined) { flags.push(`--destination ${path.quotePath(opts.destination)}`); }
        if (opts.keyring !== undefined)     { flags.push(`--keyring ${path.quotePath(opts.keyring)}`);         }
        if (opts.password !== undefined)    { flags.push(`--password ${shell.quote([opts.password])}`);  }
        if (opts.repo !== undefined)        { flags.push(`--repo ${path.quotePath(opts.repo)}`);               }
        if (opts.untardir !== undefined)    { flags.push(`--untardir ${path.quotePath(opts.untardir)}`);       }
        if (opts.username !== undefined)    { flags.push(`--username ${shell.quote([opts.username])}`);  }
        if (opts.home !== undefined)        { flags.push(`--home ${path.quotePath(opts.home)}`);               }
        if (opts.devel === true)            { flags.push(`--devel`);                                           }
        if (opts.prov === true)             { flags.push(`--prov`);                                            }
        if (opts.verify === true)           { flags.push(`--verify`);                                          }
    }
    execSync(`helm fetch ${shell.quote([chart])} ${flags.join(" ")}`);
}
