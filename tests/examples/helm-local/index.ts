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

import * as k8s from "@kulado/kubernetes";
import * as kulado from "@kulado/kulado";

const namespace = new k8s.core.v1.Namespace("test");
const namespaceName = namespace.metadata.name;

function chart(resourcePrefix?: string): k8s.helm.v2.Chart {
    return new k8s.helm.v2.Chart("nginx-lego", {
        // Represents chart `stable/nginx-lego@v0.3.1`.
        path: "nginx-lego",
        version: "0.3.1",
        resourcePrefix: resourcePrefix,
        values: {
            // Override for the Chart's `values.yml` file. Use `null` to zero out resource requests so it
            // can be scheduled on our (wimpy) CI cluster. (Setting these values to `null` is the "normal"
            // way to delete values.)
            nginx: {resources: null},
            default: {resources: null},
            lego: {resources: null}
        },
        transformations: [
            // Make every service private to the cluster, i.e., turn all services into ClusterIP instead of
            // LoadBalancer.
            (obj: any) => {
                if (obj.kind == "Service" && obj.apiVersion == "v1") {
                    if (obj.spec && obj.spec.type && obj.spec.type == "LoadBalancer") {
                        obj.spec.type = "ClusterIP";
                    }
                }
            },
            // Put every resource in the created namespace.
            (obj: any) => {
                if (obj.metadata !== undefined) {
                    obj.metadata.namespace = namespaceName;
                } else {
                    obj.metadata = {namespace: namespaceName};
                }
            }
        ]
    });
}

// Create the first instance of the Chart.
const nginx = chart();

// Export the (cluster-private) IP address of the Guestbook frontend.
const frontendServiceSpec = kulado.all([namespaceName, nginx]).apply(([nsName, nginx]) =>
    nginx.getResourceProperty("v1/Service", nsName, "nginx-lego-nginx-lego", "spec"));
export const frontendServiceIP = frontendServiceSpec.clusterIP;

// Deploy a duplicate chart with a different resource prefix to verify that multiple instances of the Chart
// can be managed in the same stack.
chart("dup");
