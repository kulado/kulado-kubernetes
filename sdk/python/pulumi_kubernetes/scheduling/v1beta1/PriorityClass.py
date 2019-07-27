# *** WARNING: this file was generated by the Kulado Kubernetes codegen tool. ***
# *** Do not edit by hand unless you're certain you know what you are doing! ***

import kulado
import kulado.runtime
import warnings

from ... import tables, version


class PriorityClass(kulado.CustomResource):
    """
    DEPRECATED - This group version of PriorityClass is deprecated by
    scheduling.k8s.io/v1/PriorityClass. PriorityClass defines mapping from a priority class name to
    the priority integer value. The value can be any valid integer.
    """
    def __init__(self, resource_name, opts=None, description=None, global_default=None, metadata=None, preemption_policy=None, value=None, __name__=None, __opts__=None):
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

        __props__['apiVersion'] = 'scheduling.k8s.io/v1beta1'
        __props__['kind'] = 'PriorityClass'
        if value is None:
            raise TypeError('Missing required property value')
        __props__['value'] = value
        __props__['description'] = description
        __props__['globalDefault'] = global_default
        __props__['metadata'] = metadata
        __props__['preemptionPolicy'] = preemption_policy

        if opts is None:
            opts = kulado.ResourceOptions()
        if opts.version is None:
            opts.version = version.get_version()

        super(PriorityClass, self).__init__(
            "kubernetes:scheduling.k8s.io/v1beta1:PriorityClass",
            resource_name,
            __props__,
            opts)

    def translate_output_property(self, prop: str) -> str:
        return tables._CASING_FORWARD_TABLE.get(prop) or prop

    def translate_input_property(self, prop: str) -> str:
        return tables._CASING_BACKWARD_TABLE.get(prop) or prop
