# *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import json
import os.path
import subprocess
from tempfile import NamedTemporaryFile, TemporaryDirectory
from typing import Callable, List, Optional, Tuple, Union

import kulado.runtime
import yaml
from kulado_kubernetes.yaml import _parse_yaml_document


class FetchOpts:
    """
    FetchOpts is a bag of configuration options to customize the fetching of the Helm chart.
    """

    version: Optional[kulado.Input[str]]
    """
    Specific version of a chart. If unset, the latest version is fetched.
    """

    ca_file: Optional[kulado.Input[str]]
    """
    Verify certificates of HTTPS-enabled servers using this CA bundle.
    """

    cert_file: Optional[kulado.Input[str]]
    """
    Identify HTTPS client using this SSL certificate file.
    """

    key_file: Optional[kulado.Input[str]]
    """
    Identify HTTPS client using this SSL key file.
    """

    destination: Optional[kulado.Input[str]]
    """
    Location to write the chart. If this and [tardir] are specified, tardir is appended
    to this (default ".").
    """

    keyring: Optional[kulado.Input[str]]
    """
    Keyring containing public keys (default "/Users/alex/.gnupg/pubring.gpg").
    """

    password: Optional[kulado.Input[str]]
    """
    Chart repository password.
    """

    repo: Optional[kulado.Input[str]]
    """
    Chart repository url where to locate the requested chart.
    """

    untar_dir: Optional[kulado.Input[str]]
    """
    If [untar] is specified, this flag specifies the name of the directory into which
    the chart is expanded (default ".").
    """

    username: Optional[kulado.Input[str]]
    """
    Chart repository username.
    """

    home: Optional[kulado.Input[str]]
    """
    Location of your Helm config. Overrides $HELM_HOME (default "/Users/alex/.helm").
    """

    devel: Optional[kulado.Input[bool]]
    """
    Use development versions, too. Equivalent to version '>0.0.0-0'. If [version] is set,
    this is ignored.
    """

    prov: Optional[kulado.Input[bool]]
    """
    Fetch the provenance file, but don't perform verification.
    """

    untar: Optional[kulado.Input[bool]]
    """
    If set to false, will leave the chart as a tarball after downloading.
    """

    verify: Optional[kulado.Input[bool]]
    """
    Verify the package against its signature.
    """

    def __init__(self,
                 version: Optional[kulado.Input[str]] = None,
                 ca_file: Optional[kulado.Input[str]] = None,
                 cert_file: Optional[kulado.Input[str]] = None,
                 key_file: Optional[kulado.Input[str]] = None,
                 destination: Optional[kulado.Input[str]] = None,
                 keyring: Optional[kulado.Input[str]] = None,
                 password: Optional[kulado.Input[str]] = None,
                 repo: Optional[kulado.Input[str]] = None,
                 untar_dir: Optional[kulado.Input[str]] = None,
                 username: Optional[kulado.Input[str]] = None,
                 home: Optional[kulado.Input[str]] = None,
                 devel: Optional[kulado.Input[bool]] = None,
                 prov: Optional[kulado.Input[bool]] = None,
                 untar: Optional[kulado.Input[bool]] = None,
                 verify: Optional[kulado.Input[bool]] = None) -> None:
        """
        :param Optional[kulado.Input[str]] version: Specific version of a chart. If unset,
               the latest version is fetched.
        :param Optional[kulado.Input[str]] ca_file: Verify certificates of HTTPS-enabled
               servers using this CA bundle.
        :param Optional[kulado.Input[str]] cert_file: Identify HTTPS client using this SSL
               certificate file.
        :param Optional[kulado.Input[str]] key_file: Identify HTTPS client using this SSL
               key file.
        :param Optional[kulado.Input[str]] destination: Location to write the chart.
               If this and [tardir] are specified, tardir is appended to this (default ".").
        :param Optional[kulado.Input[str]] keyring: Keyring containing public keys
               (default "/Users/<user>/.gnupg/pubring.gpg").
        :param Optional[kulado.Input[str]] password: Chart repository password.
        :param Optional[kulado.Input[str]] repo: Chart repository url where to locate
               the requested chart.
        :param Optional[kulado.Input[str]] untar_dir: If [untar] is specified, this flag
               specifies the name of the directory into which the chart is
               expanded (default ".").
        :param Optional[kulado.Input[str]] username: Chart repository username.
        :param Optional[kulado.Input[str]] home: Location of your Helm config. Overrides
               $HELM_HOME (default "/Users/<user>/.helm").
        :param Optional[kulado.Input[bool]] devel: Use development versions, too.
               Equivalent to version '>0.0.0-0'. If [version] is set, this is ignored.
        :param Optional[kulado.Input[bool]] prov: Fetch the provenance file, but don't
               perform verification.
        :param Optional[kulado.Input[bool]] untar: If set to false, will leave the
               chart as a tarball after downloading.
        :param Optional[kulado.Input[bool]] verify: Verify the package against its signature.
        """
        self.version = version
        self.ca_file = ca_file
        self.cert_file = cert_file
        self.key_file = key_file
        self.destination = destination
        self.keyring = keyring
        self.password = password
        self.repo = repo
        self.untar_dir = untar_dir
        self.username = username
        self.home = home
        self.devel = devel
        self.prov = prov
        self.untar = untar
        self.verify = verify


class BaseChartOpts:
    namespace: Optional[kulado.Input[str]]
    """
    Optional namespace to install chart resources into.
    """

    values: Optional[kulado.Inputs]
    """
    Optional overrides for chart values.
    """

    transformations: Optional[List[Callable]]
    """
    Optional list of transformations to apply to resources that will be created by this chart prior to
    creation. Allows customization of the chart behaviour without directly modifying the chart itself.
    """

    resource_prefix: Optional[str]
    """
    Optional prefix for the auto-generated resource names.
    Example: A resource created with resource_prefix="foo" would produce a resource named "foo-resourceName".
    """

    def __init__(self,
                 namespace: Optional[kulado.Input[str]] = None,
                 values: Optional[kulado.Inputs] = None,
                 transformations: Optional[List[Callable]] = None,
                 resource_prefix: Optional[str] = None) -> None:
        """
        :param Optional[kulado.Input[str]] namespace: Optional namespace to install chart resources into.
        :param Optional[kulado.Inputs] values: Optional overrides for chart values.
        :param Optional[List[Callable]] transformations: Optional list of transformations to apply to
               resources that will be created by this chart prior to creation. Allows customization of the
               chart behaviour without directly modifying the chart itself.
        :param Optional[str] resource_prefix: An optional prefix for the auto-generated resource names.
               Example: A resource created with resource_prefix="foo" would produce a resource named "foo-resourceName".
        """
        self.namespace = namespace
        self.values = values
        self.transformations = transformations
        self.resource_prefix = resource_prefix


class ChartOpts(BaseChartOpts):
    """
    ChartOpts is a bag of configuration options for a remote Helm chart.
    """

    chart: kulado.Input[str]
    """
    The chart to deploy.  If [repo] is provided, this chart name is looked up in the given repository.
    Otherwise, this chart name must be a fully qualified chart URL or `repo/chartname`.
    """

    repo: Optional[kulado.Input[str]]
    """
    The repository containing the desired chart.  If not provided, [chart] must be a fully qualified
    chart URL or repo/chartname.
    """

    version: Optional[kulado.Input[str]]
    """
    The version of the chart to deploy. If not provided, the latest version will be deployed.
    """

    fetch_opts: Optional[kulado.Input[FetchOpts]]
    """
    Additional options to customize the fetching of the Helm chart.
    """

    def __init__(self,
                 chart: kulado.Input[str],
                 namespace: Optional[kulado.Input[str]] = None,
                 values: Optional[kulado.Inputs] = None,
                 transformations: Optional[List[Callable]] = None,
                 resource_prefix: Optional[str] = None,
                 repo: Optional[kulado.Input[str]] = None,
                 version: Optional[kulado.Input[str]] = None,
                 fetch_opts: Optional[kulado.Input[FetchOpts]] = None) -> None:
        """
        :param kulado.Input[str] chart: The chart to deploy.  If [repo] is provided, this chart name is
               looked up in the given repository. Otherwise, this chart name must be a fully qualified
               chart URL or `repo/chartname`.
        :param Optional[kulado.Input[str]] namespace: Optional namespace to install chart resources into.
        :param Optional[kulado.Inputs] values: Optional overrides for chart values.
        :param Optional[List[Callable] transformations: Optional list of transformations to apply to
               resources that will be created by this chart prior to creation. Allows customization of the
               chart behaviour without directly modifying the chart itself.
        :param Optional[str] resource_prefix: An optional prefix for the auto-generated resource names.
               Example: A resource created with resource_prefix="foo" would produce a resource named "foo-resourceName".
        :param Optional[kulado.Input[str]] repo: The repository containing the desired chart.  If not
               provided, [chart] must be a fully qualified chart URL or repo/chartname.
        :param Optional[kulado.Input[str]] version: The version of the chart to deploy. If not provided,
               the latest version will be deployed.
        :param Optional[kulado.Input[FetchOpts]] fetch_opts: Additional options to customize the
               fetching of the Helm chart.
        """
        super(ChartOpts, self).__init__(namespace, values, transformations, resource_prefix)
        self.chart = chart
        self.repo = repo
        self.version = version
        self.fetch_opts = fetch_opts


class LocalChartOpts:
    """
    LocalChartOpts is a bag of configuration options for a local Helm chart.
    """

    path: kulado.Input[str]
    """
    The path to the chart directory which contains the `Chart.yaml` file.
    """

    def __init__(self,
                 path: kulado.Input[str],
                 namespace: Optional[kulado.Input[str]] = None,
                 values: Optional[kulado.Inputs] = None,
                 transformations: Optional[List[Callable]] = None,
                 resource_prefix: Optional[str] = None) -> None:
        """
        :param kulado.Input[str] path: The path to the chart directory which contains the
               `Chart.yaml` file.
        :param Optional[kulado.Input[str]] namespace: Optional namespace to install chart resources into.
        :param Optional[kulado.Inputs] values: Optional overrides for chart values.
        :param Optional[List[Callable]] transformations: Optional list of transformations to apply to
               resources that will be created by this chart prior to creation. Allows customization of the
               chart behaviour without directly modifying the chart itself.
        :param Optional[str] resource_prefix: An optional prefix for the auto-generated resource names.
               Example: A resource created with resource_prefix="foo" would produce a resource named "foo-resourceName".
        """

        super(LocalChartOpts, self).__init__(namespace, values, transformations, resource_prefix)
        self.path = path


def _parse_chart(all_config: Tuple[str, Union[ChartOpts, LocalChartOpts], kulado.ResourceOptions]) -> kulado.Output:
    release_name, config, opts = all_config

    # Create temporary directory and file to hold chart data and override values.
    with NamedTemporaryFile() as overrides:
        with TemporaryDirectory() as chart_dir:
            if isinstance(config, ChartOpts):
                chart_to_fetch = f'{config.repo}/{config.chart}' if config.repo else config.chart

                # Configure fetch options.
                fetch_opts_dict = {}
                if config.fetch_opts is not None:
                    fetch_opts_dict = {k: v for k, v in vars(config.fetch_opts).items() if v is not None}
                fetch_opts_dict["destination"] = chart_dir
                if config.version is not None:
                    fetch_opts_dict["version"] = config.version
                fetch_opts = FetchOpts(**fetch_opts_dict)

                # Fetch the chart.
                _fetch(chart_to_fetch, fetch_opts)
                fetched_chart_name = os.listdir(chart_dir)[0]
                chart = os.path.join(chart_dir, fetched_chart_name)
            else:
                chart = config.path

            default_values = os.path.join(chart, 'values.yaml')

            # Write overrides file.
            vals = config.values if config.values is not None else {}
            data = json.dumps(vals).encode('utf-8')
            overrides.write(data)

            namespace_arg = ['--namespace', config.namespace] if config.namespace else []

            # Use 'helm template' to create a combined YAML manifest.
            cmd = ['helm', 'template', chart, '--name', release_name,
                   '--values', default_values, '--values', overrides.name]
            cmd.extend(namespace_arg)

            output = subprocess.run(
                cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True, check=True)
            yaml_str: str = output.stdout

            # Parse the manifest and create the specified resources.
            return _parse_yaml_document(yaml.safe_load_all(yaml_str), opts, config.transformations)


def _fetch(chart: str, opts: FetchOpts) -> None:
    cmd: List[str] = ['helm', 'fetch', chart]

    # Untar by default.
    if opts.untar is not False:
        cmd.append('--untar')

    if opts.version:
        cmd.extend(['--version', opts.version])
    if opts.ca_file:
        cmd.extend(['--ca-file', opts.ca_file])
    if opts.cert_file:
        cmd.extend(['--cert-file', opts.cert_file])
    if opts.key_file:
        cmd.extend(['--key-file', opts.key_file])
    if opts.destination:
        cmd.extend(['--destination', opts.destination])
    if opts.keyring:
        cmd.extend(['--keyring', opts.keyring])
    if opts.password:
        cmd.extend(['--password', opts.password])
    if opts.repo:
        cmd.extend(['--repo', opts.repo])
    if opts.untar_dir:
        cmd.extend(['--untardir', opts.untar_dir])
    if opts.username:
        cmd.extend(['--username', opts.username])
    if opts.home:
        cmd.extend(['--home', opts.home])
    if opts.devel:
        cmd.append('--devel')
    if opts.prov:
        cmd.append('--prov')
    if opts.verify:
        cmd.append('--verify')

    subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True, check=True)


class Chart(kulado.ComponentResource):
    """
    Chart is a component representing a collection of resources described by an arbitrary Helm
    Chart. The Chart can be fetched from any source that is accessible to the `helm` command
    line. Values in the `values.yml` file can be overridden using `ChartOpts.values` (equivalent
    to `--set` or having multiple `values.yml` files). Objects can be transformed arbitrarily by
    supplying callbacks to `ChartOpts.transformations`.

    `Chart` does not use Tiller. The Chart specified is copied and expanded locally; any values
    that would be retrieved in-cluster would be assigned fake values, and none of Tiller's
    server-side validity testing is executed.

    The semantics of `update` on a Chart are identical to those of Helm and kubectl; for example,
    unlike a "normal" Kulado program, updating a ConfigMap does not trigger a cascading update
    among Deployments that reference it.

    :param str release_name: Name of the Chart (e.g., nginx-ingress).
    :param Union[ChartOpts, LocalChartOpts] config: Configuration options for the Chart.
    :param Optional[kulado.ResourceOptions] opts: A bag of options that control this
           resource's behavior.
    """

    def __init__(self, release_name: str,
                 config: Union[ChartOpts, LocalChartOpts],
                 opts: Optional[kulado.ResourceOptions] = None):
        if not release_name:
            raise TypeError('Missing release name argument')
        if not isinstance(release_name, str):
            raise TypeError('Expected release name to be a string')
        if config and not isinstance(config, ChartOpts) and not isinstance(config, LocalChartOpts):
            raise TypeError('Expected config to be a ChartOpts or LocalChartOpts instance')
        if opts and not isinstance(opts, kulado.ResourceOptions):
            raise TypeError('Expected resource options to be a ResourceOptions instance')

        __props__ = dict()

        if config.resource_prefix:
            release_name = f"{config.resource_prefix}-{release_name}"

        super(Chart, self).__init__(
            "kubernetes:helm.sh/v2:Chart",
            release_name,
            __props__,
            opts)

        if opts is not None:
            opts.parent = self
        else:
            opts = kulado.ResourceOptions(parent=self)

        all_config = kulado.Output.from_input((release_name, config, opts))

        # Note: Unlike NodeJS, Python requires that we "pull" on our futures in order to get them scheduled for
        # execution. In order to do this, we leverage the engine's RegisterResourceOutputs to wait for the
        # resolution of all resources that this Helm chart created.
        resources = all_config.apply(_parse_chart)
        self.register_outputs({"output": resources})
