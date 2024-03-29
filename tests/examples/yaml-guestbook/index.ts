// Copyright 2016-2018, Kulado Corporation.  All rights reserved.

import * as k8s from "@kulado/kubernetes";

// Create resources from standard Kubernetes guestbook YAML example.
const guestbook = new k8s.yaml.ConfigGroup("guestbook", { files: "yaml/*.yaml" });

// Export the (cluster-private) IP address of the Guestbook frontend.
export const frontendIp = guestbook.getResource("v1/Service", "frontend", "spec").clusterIP;
