// *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kulado from "@kulado/kulado";
import * as inputApi from "../../types/input";
import * as outputApi from "../../types/output";
import { getVersion } from "../../version";

    /**
     * ValidatingWebhookConfigurationList is a list of ValidatingWebhookConfiguration.
     */
    export class ValidatingWebhookConfigurationList extends kulado.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: kulado.Output<"admissionregistration.k8s.io/v1beta1">;

      /**
       * List of ValidatingWebhookConfiguration.
       */
      public readonly items: kulado.Output<outputApi.admissionregistration.v1beta1.ValidatingWebhookConfiguration[]>;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: kulado.Output<"ValidatingWebhookConfigurationList">;

      /**
       * Standard list metadata. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly metadata: kulado.Output<outputApi.meta.v1.ListMeta>;

      /**
       * Get the state of an existing `ValidatingWebhookConfigurationList` resource, as identified by `id`.
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
      public static get(name: string, id: kulado.Input<kulado.ID>, opts?: kulado.CustomResourceOptions): ValidatingWebhookConfigurationList {
          return new ValidatingWebhookConfigurationList(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __kuladoType = "kubernetes:admissionregistration.k8s.io/v1beta1:ValidatingWebhookConfigurationList";

      /**
       * Returns true if the given object is an instance of ValidatingWebhookConfigurationList.  This is designed to work even
       * when multiple copies of the Kulado SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is ValidatingWebhookConfigurationList {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__kuladoType"] === ValidatingWebhookConfigurationList.__kuladoType;
      }

      /**
       * Create a admissionregistration.v1beta1.ValidatingWebhookConfigurationList resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputApi.admissionregistration.v1beta1.ValidatingWebhookConfigurationList, opts?: kulado.CustomResourceOptions) {
          let inputs: kulado.Inputs = {};
          inputs["apiVersion"] = "admissionregistration.k8s.io/v1beta1";
          inputs["items"] = args && args.items || undefined;
          inputs["kind"] = "ValidatingWebhookConfigurationList";
          inputs["metadata"] = args && args.metadata || undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(ValidatingWebhookConfigurationList.__kuladoType, name, inputs, opts);
      }
    }
