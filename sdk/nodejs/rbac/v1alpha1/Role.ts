// *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
// *** Do not edit by hand unless you're certain you know what you are doing! ***

import * as kulado from "@kulado/kulado";
import * as inputApi from "../../types/input";
import * as outputApi from "../../types/output";
import { getVersion } from "../../version";

    /**
     * Role is a namespaced, logical grouping of PolicyRules that can be referenced as a unit by a
     * RoleBinding.
     */
    export class Role extends kulado.CustomResource {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should
       * convert recognized schemas to the latest internal value, and may reject unrecognized
       * values. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#resources
       */
      public readonly apiVersion: kulado.Output<"rbac.authorization.k8s.io/v1alpha1">;

      /**
       * Kind is a string value representing the REST resource this object represents. Servers may
       * infer this from the endpoint the client submits requests to. Cannot be updated. In
       * CamelCase. More info:
       * https://git.k8s.io/community/contributors/devel/api-conventions.md#types-kinds
       */
      public readonly kind: kulado.Output<"Role">;

      /**
       * Standard object's metadata.
       */
      public readonly metadata: kulado.Output<outputApi.meta.v1.ObjectMeta>;

      /**
       * Rules holds all the PolicyRules for this Role
       */
      public readonly rules: kulado.Output<outputApi.rbac.v1alpha1.PolicyRule[]>;

      /**
       * Get the state of an existing `Role` resource, as identified by `id`.
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
      public static get(name: string, id: kulado.Input<kulado.ID>, opts?: kulado.CustomResourceOptions): Role {
          return new Role(name, undefined, { ...opts, id: id });
      }

      /** @internal */
      private static readonly __kuladoType = "kubernetes:rbac.authorization.k8s.io/v1alpha1:Role";

      /**
       * Returns true if the given object is an instance of Role.  This is designed to work even
       * when multiple copies of the Kulado SDK have been loaded into the same process.
       */
      public static isInstance(obj: any): obj is Role {
          if (obj === undefined || obj === null) {
              return false;
          }

          return obj["__kuladoType"] === Role.__kuladoType;
      }

      /**
       * Create a rbac.v1alpha1.Role resource with the given unique name, arguments, and options.
       *
       * @param name The _unique_ name of the resource.
       * @param args The arguments to use to populate this resource's properties.
       * @param opts A bag of options that control this resource's behavior.
       */
      constructor(name: string, args?: inputApi.rbac.v1alpha1.Role, opts?: kulado.CustomResourceOptions) {
          let inputs: kulado.Inputs = {};
          inputs["apiVersion"] = "rbac.authorization.k8s.io/v1alpha1";
          inputs["kind"] = "Role";
          inputs["metadata"] = args && args.metadata || undefined;
          inputs["rules"] = args && args.rules || undefined;

          if (!opts) {
              opts = {};
          }

          if (!opts.version) {
              opts.version = getVersion();
          }
          super(Role.__kuladoType, name, inputs, opts);
      }
    }
