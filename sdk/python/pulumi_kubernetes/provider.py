import kulado
from . import tables


class Provider(kulado.ProviderResource):
    """
    The provider type for the kubernetes package.
    """
    def __init__(self,
                 __name__,
                 __opts__=None,
                 cluster=None,
                 context=None,
                 kubeconfig=None,
                 namespace=None):
        """
        Create a Provider resource with the given unique name, arguments, and options.

        :param str __name__: The unique name of the resource.
        :param kulado.ResourceOptions __opts__: An optional bag of options that controls this resource's behavior.
        :param kulado.Input[str] cluster: If present, the name of the kubeconfig cluster to use.
        :param kulado.Input[str] context: If present, the name of the kubeconfig context to use.
        :param kulado.Input[str] kubeconfig: The contents of a kubeconfig file.
                                             If this is set, this config will be used instead of $KUBECONFIG.
        :param kulado.Input[str] namespace: If present, the default namespace to use.
                                            This flag is ignored for cluster-scoped resources.
                                            Note: if .metadata.namespace is set on a resource, that value takes
                                            precedence over the provider default.
        """
        __props__ = {
            "cluster": cluster,
            "context": context,
            "kubeconfig": kubeconfig,
            "namespace": namespace,
        }
        super(Provider, self).__init__("kubernetes", __name__, __props__, __opts__)
