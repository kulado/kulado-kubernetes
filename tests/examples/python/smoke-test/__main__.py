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
import kulado
from kulado_kubernetes.core.v1 import Pod, Namespace

namespace = Namespace("ns")

pod = Pod(
    "smoke-test",
    metadata={
        "namespace": namespace,
    },
    spec={
        "containers": [
            {"name": "nginx", "image": "nginx"},
        ]
    })

kulado.export("ip", pod.status["pod_ip"])
