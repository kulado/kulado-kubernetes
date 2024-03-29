import * as kulado from "@kulado/kulado";

/**
 * The provider type for the kubernetes package.
 */
export class Provider extends kulado.ProviderResource {
    /**
     * Create a Provider resource with the given unique name, arguments, and options.
     *
     * @param name The _unique_ name of the resource.
     * @param args The arguments to use to populate this resource's properties.
     * @param opts A bag of options that control this resource's behavior.
     */
    constructor(name: string, args: ProviderArgs, opts?: kulado.ResourceOptions) {
        let inputs: kulado.Inputs = {
            "cluster": args ? args.cluster : undefined,
            "context": args ? args.context : undefined,
            "kubeconfig": args ? args.kubeconfig : undefined,
            "namespace": args ? args.namespace : undefined,
        };
        super("kubernetes", name, inputs, opts);
    }
}

/**
 * The set of arguments for constructing a Provider.
 */
export interface ProviderArgs {
    /**
     * If present, the name of the kubeconfig cluster to use.
     */
    readonly cluster?: kulado.Input<string>;
    /**
     * If present, the name of the kubeconfig context to use.
     */
    readonly context?: kulado.Input<string>;
    /**
     * The contents of a kubeconfig file. If this is set, this config will be used instead of $KUBECONFIG.
     */
    readonly kubeconfig?: kulado.Input<string>;
    /**
     * If present, the default namespace to use. This flag is ignored for cluster-scoped resources.
     * Note: if .metadata.namespace is set on a resource, that value takes precedence over the provider default.
     */
    readonly namespace?: kulado.Input<string>;
}
