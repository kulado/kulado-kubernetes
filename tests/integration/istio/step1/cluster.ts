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

import * as gcp from "@kulado/gcp";
import * as k8s from "@kulado/kubernetes";
import * as kulado from "@kulado/kulado";
import * as config from "./config";

const network = new gcp.compute.Network(config.appName, {
    autoCreateSubnetworks: false,
    project: config.gcpProject
});

const subnet = new gcp.compute.Subnetwork(config.appName, {
    ipCidrRange: "10.0.0.0/24",
    network: network.name,
    secondaryIpRanges: [{ rangeName: "pods", ipCidrRange: "10.1.0.0/16" }],
    project: config.gcpProject,
    region: config.gcpRegion
});

// Create the GKE cluster and export it.
export const k8sCluster = new gcp.container.Cluster(config.appName, {
    initialNodeCount: config.nodeCount,
    nodeVersion: "latest",
    minMasterVersion: "latest",
    masterAuth: { username: config.masterUsername, password: config.masterPassword },
    network: network.name,
    subnetwork: subnet.name,
    nodeConfig: {
        machineType: config.nodeMachineType,
        oauthScopes: [
            "https://www.googleapis.com/auth/compute",
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/logging.write",
            "https://www.googleapis.com/auth/monitoring"
        ]
    },
    project: config.gcpProject,
    zone: `${config.gcpRegion}-${config.gcpZone}`
});

// Manufacture a GKE-style Kubeconfig. Note that this is slightly "different" because of the way GKE requires
// gcloud to be in the picture for cluster authentication (rather than using the client cert/key directly).
export const k8sConfig = kulado
    .all([k8sCluster.name, k8sCluster.endpoint, k8sCluster.masterAuth])
    .apply(([name, endpoint, auth]) => {
        const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
        return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${auth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    auth-provider:
      config:
        cmd-args: config config-helper --format=json
        cmd-path: gcloud
        expiry-key: '{.credential.token_expiry}'
        token-key: '{.credential.access_token}'
      name: gcp
`;
    });

// Export a Kubernetes provider instance that uses our cluster from above.
export const k8sProvider = new k8s.Provider(config.appName, {
    kubeconfig: k8sConfig
});
