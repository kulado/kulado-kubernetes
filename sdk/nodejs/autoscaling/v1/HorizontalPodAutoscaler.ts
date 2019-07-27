// *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kulado from "@kulado/kulado";
import * as inputApi from "../../types/input";
import * as outputApi from "../../types/output";
import { getVersion } from "../../version";

    /**
     * configuration of a horizontal pod autoscaler.
     */
    export class HorizontalPodAutoscaler extends kulado.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: kulado.Output<"autoscaling/v1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: kulado.Output<"HorizontalPodAutoscaler">;

      /**
       * Standard object metadata. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
       */
      public readonly metadata: kulado.Output<outputApi.meta.v1.ObjectMeta>;

      /**
       * behaviour of autoscaler. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status.
       */
      public readonly spec: kulado.Output<outputApi.autoscaling.v1.HorizontalPodAutoscalerSpec>;

      /**
       * current information about the autoscaler.
       */
      public readonly status: kulado.Output<outputApi.autoscaling.v1.HorizontalPodAutoscalerStatus>;

      /**
       * Get the state of an existing `HorizontalPodAutoscaler` resource, as identified by `id`.
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
      public static get(name: string, id: kulado.Input<kulado.ID>, opts?: kulado.CustomResourceOptions): HorizontalPodAutoscaler {
          return new HorizontalPodAutoscaler(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __kuladoType = "kubernetes:autoscaling/v1:HorizontalPodAutoscaler";

      /**
       * Returns true if the given object is an instance of HorizontalPodAutoscaler.  This is designed to work even
       * when multiple copies of the Kulado SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is HorizontalPodAutoscaler {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__kuladoType"] === HorizontalPodAutoscaler.__kuladoType;
      }

      /**
       * Create a autoscaling.v1.HorizontalPodAutoscaler resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputApi.autoscaling.v1.HorizontalPodAutoscaler, opts?: kulado.CustomResourceOptions) {
          let inputs: kulado.Inputs = {};
          inputs["apiVersion"] = "autoscaling/v1";
          inputs["kind"] = "HorizontalPodAutoscaler";
          inputs["metadata"] = args && args.metadata || undefined;
          inputs["spec"] = args && args.spec || undefined;
          inputs["status"] = args && args.status || undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(HorizontalPodAutoscaler.__kuladoType, name, inputs, opts);
      }
    }
