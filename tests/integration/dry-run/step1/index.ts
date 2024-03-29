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

const appLabels = { app: "nginx" };

const deployment = new k8s.apps.v1.Deployment("nginx", {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 1,
        template: {
            metadata: { labels: appLabels },
            spec: {
                containers: [{
                    name: "nginx",
                    image: "nginx",
                    resources: {
                        limits: {
                            // This value will be normalized by the API server to "2Gi" in the returned state. Without
                            // dry-run support, Kulado will detect a spurious diff due to the normalization.
                            memory: "2048Mi",
                        },
                    },
                }],
            }
        }
    }
});
export const name = deployment.metadata.name;
