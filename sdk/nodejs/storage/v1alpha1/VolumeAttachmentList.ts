// *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kulado from "@kulado/kulado";
import * as inputApi from "../../types/input";
import * as outputApi from "../../types/output";
import { getVersion } from "../../version";

    /**
     * VolumeAttachmentList is a collection of VolumeAttachment objects.
     */
    export class VolumeAttachmentList extends kulado.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: kulado.Output<"storage.k8s.io/v1alpha1">;

      /**
       * Items is the list of VolumeAttachments
       */
      public readonly items: kulado.Output<outputApi.storage.v1alpha1.VolumeAttachment[]>;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: kulado.Output<"VolumeAttachmentList">;

      /**
       * Standard list metadata More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#metadata
       */
      public readonly metadata: kulado.Output<outputApi.meta.v1.ListMeta>;

      /**
       * Get the state of an existing `VolumeAttachmentList` resource, as identified by `id`.
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
      public static get(name: string, id: kulado.Input<kulado.ID>, opts?: kulado.CustomResourceOptions): VolumeAttachmentList {
          return new VolumeAttachmentList(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __kuladoType = "kubernetes:storage.k8s.io/v1alpha1:VolumeAttachmentList";

      /**
       * Returns true if the given object is an instance of VolumeAttachmentList.  This is designed to work even
       * when multiple copies of the Kulado SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is VolumeAttachmentList {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__kuladoType"] === VolumeAttachmentList.__kuladoType;
      }

      /**
       * Create a storage.v1alpha1.VolumeAttachmentList resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputApi.storage.v1alpha1.VolumeAttachmentList, opts?: kulado.CustomResourceOptions) {
          let inputs: kulado.Inputs = {};
          inputs["apiVersion"] = "storage.k8s.io/v1alpha1";
          inputs["items"] = args && args.items || undefined;
          inputs["kind"] = "VolumeAttachmentList";
          inputs["metadata"] = args && args.metadata || undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(VolumeAttachmentList.__kuladoType, name, inputs, opts);
      }
    }
