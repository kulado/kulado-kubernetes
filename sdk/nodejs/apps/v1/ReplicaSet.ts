// *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kulado from "@kulado/kulado";
import * as inputApi from "../../types/input";
import * as outputApi from "../../types/output";
import { getVersion } from "../../version";

    /**
     * ReplicaSet ensures that a specified number of pod replicas are running at any given time.
     */
    export class ReplicaSet extends kulado.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: kulado.Output<"apps/v1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: kulado.Output<"ReplicaSet">;

      /**
       * If the Labels of a ReplicaSet are empty, they are defaulted to be the same as the Pod(s)
       * that the ReplicaSet manages. Standard object's metadata. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
       */
      public readonly metadata: kulado.Output<outputApi.meta.v1.ObjectMeta>;

      /**
       * Spec defines the specification of the desired behavior of the ReplicaSet. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
       */
      public readonly spec: kulado.Output<outputApi.apps.v1.ReplicaSetSpec>;

      /**
       * Status is the most recently observed status of the ReplicaSet. This data may be out of date
       * by some window of time. Populated by the system. Read-only. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
       */
      public readonly status: kulado.Output<outputApi.apps.v1.ReplicaSetStatus>;

      /**
       * Get the state of an existing `ReplicaSet` resource, as identified by `id`.
       * Typically this ID  is of the form <namespace>/<name>; if <namespace> is omitted, then (per
       * Kubernetes convention) the ID becomes default/<name>.
       *
       * Kulado will keep track of this resource using `name` as the Kulado ID.
       *
       * @param name _Unique_ name used to register this resource with Kulado.
       * @param id An ID for the Kubernetes resource to retrieve. Takes the form
       *  <namespace>/<name> or <name>.
       * @param opts Uniquely specifies a CustomResource to select.
       */
      public static get(name: string, id: kulado.Input<kulado.ID>, opts?: kulado.CustomResourceOptions): ReplicaSet {
          return new ReplicaSet(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __kuladoType = "kubernetes:apps/v1:ReplicaSet";

      /**
       * Returns true if the given object is an instance of ReplicaSet.  This is designed to work even
       * when multiple copies of the Kulado SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is ReplicaSet {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__kuladoType"] === ReplicaSet.__kuladoType;
      }

      /**
       * Create a apps.v1.ReplicaSet resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputApi.apps.v1.ReplicaSet, opts?: kulado.CustomResourceOptions) {
          let inputs: kulado.Inputs = {};
          inputs["apiVersion"] = "apps/v1";
          inputs["kind"] = "ReplicaSet";
          inputs["metadata"] = args && args.metadata || undefined;
          inputs["spec"] = args && args.spec || undefined;
          inputs["status"] = args && args.status || undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(ReplicaSet.__kuladoType, name, inputs, opts);
      }
    }
