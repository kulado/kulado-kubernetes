// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as kulado from "@kulado/kulado";
import * as k8s from "@kulado/kubernetes";
import * as input from "@kulado/kubernetes/types/input";
import { AppConfig, appConfig } from "./config";

// --------------------------------------------------------------------------
// MariaDB library.
// --------------------------------------------------------------------------

function defaultLabels(appConfig: AppConfig): any {
    return { app: appConfig.appName };
}

export function makeService(appConfig: AppConfig): k8s.core.v1.Service {
    const labels = defaultLabels(appConfig);

    const ports = [
        {
            name: "mysql",
            port: 3306,
            targetPort: "mysql"
        }
    ];

    if (appConfig.metricsEnabled) {
        ports.push({
            name: "metrics",
            port: 9104,
            targetPort: "metrics"
        });
    }

    return new k8s.core.v1.Service(appConfig.appName, {
        metadata: {
            name: appConfig.appName,
            namespace: appConfig.namespace,
            labels: labels,
            ...(appConfig.metricsEnabled && {
                annotations: {
                    "prometheus.io/scrape": "true",
                    "prometheus.io/port": "9104"
                }
            })
        },
        spec: {
            type: "ClusterIP",
            ports: ports,
            selector: labels
        }
    });
}

export function makeSecret(appConfig: AppConfig): k8s.core.v1.Secret {
    const labels = defaultLabels(appConfig);
    return new k8s.core.v1.Secret(appConfig.appName, {
        metadata: {
            name: appConfig.appName,
            namespace: appConfig.namespace,
            labels: labels
        },
        type: "Opaque",
        data: {
            "mariadb-root-password": kulado
                .output(appConfig.mariaConfig)
                .apply(config => Buffer.from(config.rootPassword).toString("base64")),
            "mariadb-password": kulado
                .output(appConfig.mariaConfig)
                .apply(config => Buffer.from(config.password).toString("base64"))
        }
    });
}

export function makeConfigMap(appConfig: AppConfig): k8s.core.v1.ConfigMap {
    const labels = defaultLabels(appConfig);
    return new k8s.core.v1.ConfigMap(appConfig.appName, {
        metadata: {
            name: appConfig.appName,
            namespace: appConfig.namespace,
            labels: labels
        },
        data: {
            "my.cnf": kulado.output(appConfig.mariaConfig).cnf
        }
    });
}

export function makePersistentVolumeClaim(appConfig: AppConfig): k8s.core.v1.PersistentVolumeClaim {
    const labels = defaultLabels(appConfig);
    const accessModes = kulado.output(appConfig.persistence).apply(pers => [pers.accessMode]);
    const size = kulado.output(appConfig.persistence).size;
    return new k8s.core.v1.PersistentVolumeClaim(appConfig.appName, {
        metadata: {
            name: appConfig.appName,
            namespace: appConfig.namespace,
            labels: labels
        },
        spec: {
            accessModes: accessModes,
            resources: {
                requests: {
                    storage: size
                }
            }
        }
    });
}

namespace deployment {
    export function makePersistent(
        appConfig: AppConfig,
        passwordSecret: k8s.core.v1.Secret,
        pvcName: kulado.Input<string>,
        configMap: k8s.core.v1.ConfigMap
    ): k8s.apps.v1.Deployment {
        const volume = {
            name: "data",
            persistentVolumeClaim: {
                claimName: pvcName
            }
        };
        const dep = base(appConfig, passwordSecret, configMap);
        (<any>dep).spec.template.spec.volumes.push(volume);
        (<any>dep).spec.template.spec.containers.map((c: any) => {
            if (c.name == appConfig.appName) {
                c.volumeMounts.push({
                    name: "data",
                    mountPath: "/bitnami/mariadb"
                });
            }
            return c;
        });
        return new k8s.apps.v1.Deployment(appConfig.appName, dep);
    }

    const secure = (passwordSecret: k8s.core.v1.Secret) => [
        {
            name: "MARIADB_ROOT_PASSWORD",
            valueFrom: {
                secretKeyRef: {
                    name: passwordSecret.metadata.name,
                    key: "mariadb-root-password"
                }
            }
        },
        {
            name: "MARIADB_PASSWORD",
            valueFrom: {
                secretKeyRef: {
                    name: passwordSecret.metadata.name,
                    key: "mariadb-password"
                }
            }
        }
    ];

    const insecure = (passwordSecretName: string) => [
        {
            name: "ALLOW_EMPTY_PASSWORD",
            value: "yes"
        },
        {
            name: "MARIADB_PASSWORD",
            valueFrom: {
                secretKeyRef: {
                    name: passwordSecretName,
                    key: "mariadb-password"
                }
            }
        }
    ];

    const base = (
        appConfig: AppConfig,
        passwordSecret: k8s.core.v1.Secret,
        configMap: k8s.core.v1.ConfigMap
    ): input.apps.v1.Deployment => {
        const labels = defaultLabels(appConfig);
        const metricsContainer =
            appConfig.metricsEnabled == false
                ? []
                : [
                      {
                          name: "metrics",
                          image: kulado
                              .output(appConfig.metrics)
                              .apply(m => `${m.image}:${m.imageTag}`),
                          imagePullPolicy: kulado.output(appConfig.metrics).imagePullPolicy,
                          env: [
                              {
                                  name: "MARIADB_ROOT_PASSWORD",
                                  valueFrom: {
                                      secretKeyRef: {
                                          name: appConfig.appName,
                                          key: "mariadb-root-password"
                                      }
                                  }
                              }
                          ],
                          command: [
                              "sh",
                              "-c",
                              'DATA_SOURCE_NAME="root:$MARIADB_ROOT_PASSWORD@(localhost:3306)/" /bin/mysqld_exporter'
                          ],
                          ports: [
                              {
                                  name: "metrics",
                                  containerPort: 9104
                              }
                          ],
                          livenessProbe: {
                              httpGet: {
                                  path: "/metrics",
                                  port: "metrics"
                              },
                              initialDelaySeconds: 15,
                              timeoutSeconds: 5
                          },
                          readinessProbe: {
                              httpGet: {
                                  path: "/metrics",
                                  port: "metrics"
                              },
                              initialDelaySeconds: 5,
                              timeoutSeconds: 1
                          },
                          resources: kulado.output(appConfig).metrics.resources,
                      }
                  ];

        return {
            metadata: {
                name: appConfig.appName,
                namespace: appConfig.namespace,
                labels: labels
            },
            spec: {
                selector: {
                    matchLabels: labels
                },
                template: {
                    metadata: {
                        namespace: appConfig.namespace,
                        labels: labels
                    },
                    spec: {
                        containers: [
                            {
                                name: "mariadb",
                                image: appConfig.image,
                                imagePullPolicy: appConfig.imagePullPolicy,
                                env: [
                                    ...secure(passwordSecret),
                                    {
                                        name: "MARIADB_USER",
                                        value: kulado.output(appConfig).mariaConfig.user,
                                    },
                                    {
                                        name: "MARIADB_DATABASE",
                                        value: kulado.output(appConfig).mariaConfig.db,
                                    }
                                ],
                                ports: [
                                    {
                                        name: "mysql",
                                        containerPort: 3306
                                    }
                                ],
                                livenessProbe: {
                                    exec: {
                                        command: ["mysqladmin", "ping"]
                                    },
                                    initialDelaySeconds: 30,
                                    timeoutSeconds: 5
                                },
                                readinessProbe: {
                                    exec: {
                                        command: ["mysqladmin", "ping"]
                                    },
                                    initialDelaySeconds: 5,
                                    timeoutSeconds: 1
                                },
                                resources: appConfig.resources,
                                volumeMounts: [
                                    {
                                        name: "config",
                                        mountPath: "/bitnami/mariadb/conf/my_custom.cnf",
                                        subPath: "my.cnf"
                                    }
                                ]
                            },
                            ...metricsContainer
                        ],
                        volumes: [
                            {
                                name: "config",
                                configMap: {
                                    name: configMap.metadata.name,
                                }
                            }
                        ]
                    }
                }
            }
        };
    };
}

// --------------------------------------------------------------------------
// Example app.
// --------------------------------------------------------------------------

const cm = makeConfigMap(appConfig);
const s = makeSecret(appConfig);
const pvc = makePersistentVolumeClaim(appConfig);
const d = deployment.makePersistent(appConfig, s, pvc.metadata.name, cm);
const svc = makeService(appConfig);
