import * as k8s from "@kulado/kubernetes";
import * as kulado from "@kulado/kulado";
import * as random from "@kulado/random";

const config = new kulado.Config();

export interface AppConfig {
    namespace: kulado.Input<string>;
    appName: string;

    metricsEnabled: kulado.Input<boolean>;

    storageClassName?: kulado.Input<string>;

    mariaConfig: kulado.Input<{
        rootPassword: kulado.Input<string>;
        user: kulado.Input<string>;
        db: kulado.Input<string>;
        password: kulado.Input<string>;
        cnf: kulado.Input<string>;
    }>;

    image: kulado.Input<string>;
    imagePullPolicy: kulado.Input<string>;
    serviceType: kulado.Input<string>;

    persistence: kulado.Input<{
        accessMode: kulado.Input<string>;
        size: kulado.Input<string>;
    }>;

    resources: kulado.Input<{
        requests: kulado.Input<{
            cpu: kulado.Input<string>;
            memory: kulado.Input<string>;
        }>;
    }>;

    metrics: kulado.Input<{
        image: kulado.Input<string>;
        imageTag: kulado.Input<string>;
        imagePullPolicy: kulado.Input<string>;
        resources: kulado.Input<{}>;
        annotations: kulado.Input<{
            "prometheus.io/scrape": "true";
            "prometheus.io/port": "9104";
        }>;
    }>;
}

export const appConfig: AppConfig = {
    namespace:
        config.get("namespace") ||
        new k8s.core.v1.Namespace("mariadb-ns").metadata.name,
    appName: config.get("appName") || "mariadb-app",

    metricsEnabled: config.getBoolean("metricsEnabled") || true,

    mariaConfig: {
        rootPassword:
            config.get("mariadbRootPassword") ||
            new random.RandomString("rootPassword", {
                length: 16,
                special: true
            }).result,
        user: config.get("mariadbUser") || "admin",
        db: config.get("mariadbTableName") || "admin-db",
        password:
            config.get("mariadbPassword") ||
            new random.RandomString("password", {
                length: 16,
                special: true
            }).result,
        cnf: `[mysqld]
        innodb_buffer_pool_size=2G`
    },

    image: config.get("image") || "bitnami/mariadb:10.1.26-r2",
    imagePullPolicy: config.get("imagePullPolicy") || "IfNotPresent",
    serviceType: config.get("serviceType") || "ClusterIP",
    persistence: {
        accessMode: config.get("mariadbPvAccess") || "ReadWriteOnce",
        size: config.get("mariadbPvSize") || "8Gi"
    },
    resources: {
        requests: {
            memory: "256Mi",
            cpu: "250m"
        }
    },
    metrics: {
        image: "prom/mysqld-exporter",
        imageTag: "v0.10.0",
        imagePullPolicy: "IfNotPresent",
        resources: {},
        annotations: {
            "prometheus.io/scrape": "true",
            "prometheus.io/port": "9104"
        }
    }
};
