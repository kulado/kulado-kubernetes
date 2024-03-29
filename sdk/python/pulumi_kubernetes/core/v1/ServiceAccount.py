# *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import kulado
import kulado.runtime
import warnings

from ... import tables, version


class ServiceAccount(kulado.CustomResource):
    """
    ServiceAccount binds together: * a name, understood by users, and perhaps by peripheral systems,
    for an identity * a principal that can be authenticated and authorized * a set of secrets
    """
    def __init__(self, resource_name, opts=None, automount_service_account_token=None, image_pull_secrets=None, metadata=None, secrets=None, __name__=None, __opts__=None):
        if __name__ is not None:
            warnings.warn("explicit use of __name__ is deprecated", DeprecationWarning)
            resource_name = __name__
        if __opts__ is not None:
            warnings.warn("explicit use of __opts__ is deprecated, use 'opts' instead", DeprecationWarning)
            opts = __opts__
        if not resource_name:
            raise TypeError('Missing resource name argument (for URN creation)')
        if not isinstance(resource_name, str):
            raise TypeError('Expected resource name to be a string')
        if opts and not isinstance(opts, kulado.ResourceOptions):
            raise TypeError('Expected resource options to be a ResourceOptions instance')

        __props__ = dict()

        __props__['apiVersion'] = 'v1'
        __props__['kind'] = 'ServiceAccount'
        __props__['automountServiceAccountToken'] = automount_service_account_token
        __props__['imagePullSecrets'] = image_pull_secrets
        __props__['metadata'] = metadata
        __props__['secrets'] = secrets

        if opts is None:
            opts = kulado.ResourceOptions()
        if opts.version is None:
            opts.version = version.get_version()

        super(ServiceAccount, self).__init__(
            "kubernetes:core/v1:ServiceAccount",
            resource_name,
            __props__,
            opts)

    def translate_output_property(self, prop: str) -> str:
        return tables._CASING_FORWARD_TABLE.get(prop) or prop

    def translate_input_property(self, prop: str) -> str:
        return tables._CASING_BACKWARD_TABLE.get(prop) or prop
