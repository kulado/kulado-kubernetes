# *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import kulado
import kulado.runtime
import warnings

from ... import tables, version


class ClusterRoleBinding(kulado.CustomResource):
    """
    ClusterRoleBinding references a ClusterRole, but not contain it.  It can reference a ClusterRole
    in the global namespace, and adds who information via Subject.
    """
    def __init__(self, resource_name, opts=None, metadata=None, role_ref=None, subjects=None, __name__=None, __opts__=None):
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

        __props__['apiVersion'] = 'rbac.authorization.k8s.io/v1beta1'
        __props__['kind'] = 'ClusterRoleBinding'
        if role_ref is None:
            raise TypeError('Missing required property role_ref')
        __props__['roleRef'] = role_ref
        __props__['metadata'] = metadata
        __props__['subjects'] = subjects

        if opts is None:
            opts = kulado.ResourceOptions()
        if opts.version is None:
            opts.version = version.get_version()

        super(ClusterRoleBinding, self).__init__(
            "kubernetes:rbac.authorization.k8s.io/v1beta1:ClusterRoleBinding",
            resource_name,
            __props__,
            opts)

    def translate_output_property(self, prop: str) -> str:
        return tables._CASING_FORWARD_TABLE.get(prop) or prop

    def translate_input_property(self, prop: str) -> str:
        return tables._CASING_BACKWARD_TABLE.get(prop) or prop
