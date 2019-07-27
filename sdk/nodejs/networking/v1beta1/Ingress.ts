// *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kulado from "@kulado/kulado";
import * as inputApi from "../../types/input";
import * as outputApi from "../../types/output";
import { getVersion } from "../../version";

    /**
     * Ingress is a collection of rules that allow inbound connections to reach the endpoints
     * defined by a backend. An Ingress can be configured to give services externally-reachable
     * urls, load balance traffic, terminate SSL, offer name based virtual hosting etc.
     */
    export class Ingress extends kulado.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: kulado.Output<"networking.k8s.io/v1beta1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: kulado.Output<"Ingress">;

      /**
       * Standard object's metadata. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
       */
      public readonly metadata: kulado.Output<outputApi.meta.v1.ObjectMeta>;

      /**
       * Spec is the desired state of the Ingress. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
       */
      public readonly spec: kulado.Output<outputApi.networking.v1beta1.IngressSpec>;

      /**
       * Status is the current state of the Ingress. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#spec-and-status
       */
      public readonly status: kulado.Output<outputApi.networking.v1beta1.IngressStatus>;

      /**
       * Get the state of an existing `Ingress` resource, as identified by `id`.
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
      public static get(name: string, id: kulado.Input<kulado.ID>, opts?: kulado.CustomResourceOptions): Ingress {
          return new Ingress(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __kuladoType = "kubernetes:networking.k8s.io/v1beta1:Ingress";

      /**
       * Returns true if the given object is an instance of Ingress.  This is designed to work even
       * when multiple copies of the Kulado SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is Ingress {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__kuladoType"] === Ingress.__kuladoType;
      }

      /**
       * Create a networking.v1beta1.Ingress resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputApi.networking.v1beta1.Ingress, opts?: kulado.CustomResourceOptions) {
          let inputs: kulado.Inputs = {};
          inputs["apiVersion"] = "networking.k8s.io/v1beta1";
          inputs["kind"] = "Ingress";
          inputs["metadata"] = args && args.metadata || undefined;
          inputs["spec"] = args && args.spec || undefined;
          inputs["status"] = args && args.status || undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(Ingress.__kuladoType, name, inputs, opts);
      }
    }
