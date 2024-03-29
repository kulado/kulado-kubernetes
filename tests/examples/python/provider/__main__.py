# Copyright 2016-2019, Kulado Corporation.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
from os import path

from kulado import ResourceOptions
from kulado_kubernetes import Provider
from kulado_kubernetes.core.v1 import Pod, Namespace

kubeconfig_file = path.join(path.expanduser("~"), ".kube", "config")
with open(kubeconfig_file) as f:
    kubeconfig = f.read()

my_k8s = Provider("myk8s", kubeconfig=kubeconfig)

namespace = Namespace("test")

nginx = Pod(
    "nginx",
    metadata={
        "namespace": namespace,
    },
    spec={
        "containers": [{
            "image": "nginx:1.7.9",
            "name": "nginx",
            "ports": [{
                "container_port": 80,
            }],
        }],
    }, __opts__=ResourceOptions(provider=my_k8s))
