## 0.25.3 (Unreleased)

### Supported Kubernetes versions

- v1.15.x
- v1.14.x
- v1.13.x

### Bug fixes

-   Allow `yaml.ConfigGroup` to take URLs as argument
    (https://github.com/kulado/kulado-kubernetes/pull/638).
-   Return useful errors when we fail to fetch URL YAML
    (https://github.com/kulado/kulado-kubernetes/pull/638).
-   Use JSON_SCHEMA when parsing Kubernetes YAML, to conform with the expectations of the Kubernetes
    core resource types. (https://github.com/kulado/kulado-kubernetes/pull/638).
-   Don't render emoji on Windows. (https://github.com/kulado/kulado-kubernetes/pull/634)
-   Emit a useful error message (rather than a useless one) if we fail to parse the YAML data in
    `kubernetes:config:kubeconfig` (https://github.com/kulado/kulado-kubernetes/pull/636).
-   Provide useful contexts in provider errors, particularly those that originate from the API
    server (https://github.com/kulado/kulado-kubernetes/pull/636).
-   Expose all Kubernetes types through the SDK
    (https://github.com/kulado/kulado-kubernetes/pull/637).
-   Use `opts` instead of `__opts__` and `resource_name` instead of `__name__` in Python SDK
    (https://github.com/kulado/kulado-kubernetes/pull/639).
-   Properly detect failed Deployment on rollout. (https://github.com/kulado/kulado-kubernetes/pull/646).
-   Use dry-run support if available when diffing the actual and desired state of a resource
    (https://github.com/kulado/kulado-kubernetes/pull/649)
-   Fix panic when `.metadata.label` is mistyped
    (https://github.com/kulado/kulado-kubernetes/pull/655).
-   Fix unexpected diffs when running against an API server that does not support dry-run.
    (https://github.com/kulado/kulado-kubernetes/pull/658)

## 0.25.2 (July 11, 2019)

### Supported Kubernetes versions

- v1.15.x
- v1.14.x
- v1.13.x

### Improvements

-   The Kubernetes provider can now communicate detailed information about the difference between a resource's
desired and actual state during a Kulado update. (https://github.com/kulado/kulado-kubernetes/pull/618).
-   Refactor Pod await logic for easier testing and maintenance (https://github.com/kulado/kulado-kubernetes/pull/590).
-   Update to client-go v12.0.0 (https://github.com/kulado/kulado-kubernetes/pull/621).
-   Fallback to JSON merge if strategic merge fails (https://github.com/kulado/kulado-kubernetes/pull/622).

### Bug fixes

-   Fix Helm Chart resource by passing `resourcePrefix` to the yaml template resources (https://github.com/kulado/kulado-kubernetes/pull/625).

## 0.25.1 (July 2, 2019)

### Supported Kubernetes versions

- v1.15.x
- v1.14.x
- v1.13.x

### Improvements

-   Unify diff behavior between `Diff` and `Update`. This should result in better detection of state drift as
    well as behavior that is more consistent with respect to `kubectl`. (https://github.com/kulado/kulado-kubernetes/pull/604)
-   The Kubernetes provider now supports the internal features necessary for the Kulado engine to detect diffs between the actual and desired state of a resource after a `kulado refresh` (https://github.com/kulado/kulado-kubernetes/pull/477).
-   The Kubernetes provider now sets the `"kubectl.kubernetes.io/last-applied-configuration"` annotation to the last deployed configuration for a resource. This enables better interoperability with `kubectl`.

### Bug fixes

-   Add more props that force replacement of Pods (https://github.com/kulado/kulado-kubernetes/pull/613)

## 0.25.0 (June 19, 2019)

### Supported Kubernetes versions

- v1.15.x
- v1.14.x
- v1.13.x

### Major changes

-   Add support for Kubernetes v1.15.0 (https://github.com/kulado/kulado-kubernetes/pull/557)

### Improvements

-   Enable multiple instances of Helm charts per stack (https://github.com/kulado/kulado-kubernetes/pull/599).
-   Enable multiple instances of YAML manifests per stack (https://github.com/kulado/kulado-kubernetes/pull/594).

### Bug fixes

-   None

## 0.24.0 (June 5, 2019)

### Supported Kubernetes versions

- v1.14.x
- v1.13.x
- v1.12.x

### Important

BREAKING: This release changes the behavior of the provider `namespace` flag introduced
in `0.23.0`. Previously, this flag was treated as an override, which ignored namespace
values set directly on resources. Now, the flag is a default, and will only set the
namespace if one is not already set. If you have created resources using a provider
with the `namespace` flag set, this change may cause these resources to be recreated
on the next update.

### Major changes

-   BREAKING: Change the recently added `transformations` callback in Python to match JavaScript API (https://github.com/kulado/kulado-kubernetes/pull/575)
-   BREAKING: Remove `getInputs` from Kubernetes resource implementations. (https://github.com/kulado/kulado-kubernetes/pull/580)
-   BREAKING: Change provider namespace from override to default. (https://github.com/kulado/kulado-kubernetes/pull/585)

### Improvements

-   Enable configuring `ResourceOptions` via `transformations` (https://github.com/kulado/kulado-kubernetes/pull/575).
-   Changing k8s cluster config now correctly causes dependent resources to be replaced (https://github.com/kulado/kulado-kubernetes/pull/577).
-   Add user-defined type guard `isInstance` to all Kubernetes `CustomResource` implementations (https://github.com/kulado/kulado-kubernetes/pull/582).

### Bug fixes

-   Fix panics during preview when `metadata` is a computed value (https://github.com/kulado/kulado-kubernetes/pull/572)

## 0.23.1 (May 10, 2019)

### Supported Kubernetes versions

- v1.14.x
- v1.13.x
- v1.12.x

### Major changes

-   None

### Improvements

-   Update to use client-go v11.0.0 (https://github.com/kulado/kulado-kubernetes/pull/549)
-   Deduplicate provider logs (https://github.com/kulado/kulado-kubernetes/pull/558)

### Bug fixes

-   Fix namespaceable check for diff (https://github.com/kulado/kulado-kubernetes/pull/554)

## 0.23.0 (April 30, 2019)

### Supported Kubernetes versions

- v1.14.x
- v1.13.x
- v1.12.x

### Important

This release fixes a longstanding issue with the provider namespace flag. Previously, this
flag was erroneously ignored, but will now cause any resources using this provider to be
created in the specified namespace. **This may cause resources to be recreated!** Unset the
namespace parameter to avoid this behavior. Also note that this parameter takes precedence
over any namespace defined on the underlying resource.

The Python SDK now supports YAML manifests and Helm charts, including `CustomResourceDefinitions`
and `CustomResources`!

### Major changes

-   Put all resources in specified provider namespace (https://github.com/kulado/kulado-kubernetes/pull/538)
-   Add Helm support to Python SDK (https://github.com/kulado/kulado-kubernetes/pull/544)

### Bug fixes

-   Fix Helm repo quoting for Windows (https://github.com/kulado/kulado-kubernetes/pull/540)
-   Fix Python YAML SDK (https://github.com/kulado/kulado-kubernetes/pull/545)

## 0.22.2 (April 11, 2019)

### Supported Kubernetes versions

- v1.14.x
- v1.13.x
- v1.12.x

### Important

This release improves handling for CustomResources (CRs) and CustomResourceDefinitions (CRDs).
CRs without a matching CRD will now be considered deleted during `kulado refresh`, and `kulado destroy`
will not fail to delete a CR if the related CRD is missing.
See https://github.com/kulado/kulado-kubernetes/pull/530 for details.

### Major changes

-   None

### Improvements

-   Improve error handling for "no match found" errors (https://github.com/kulado/kulado-kubernetes/pull/530)

### Bug fixes

-   None

## 0.22.1 (April 9, 2019)

### Supported Kubernetes versions

- v1.14.x
- v1.13.x
- v1.12.x

### Major changes

-   Add basic YAML support to Python SDK (https://github.com/kulado/kulado-kubernetes/pull/499)
-   Add transforms to YAML support for Python SDK (https://github.com/kulado/kulado-kubernetes/pull/500)

### Improvements

-   Move helm module into a directory (https://github.com/kulado/kulado-kubernetes/pull/512)
-   Move yaml module into a directory (https://github.com/kulado/kulado-kubernetes/pull/513)

### Bug fixes

-   Fix Deployment await logic for old API schema (https://github.com/kulado/kulado-kubernetes/pull/523)
-   Replace PodDisruptionBudget if spec changes (https://github.com/kulado/kulado-kubernetes/pull/527)

## 0.22.0 (March 25, 2019)

### Supported Kubernetes versions

- v1.14.x
- v1.13.x
- v1.12.x

### Major changes

-   Add support for Kubernetes v1.14.0 (https://github.com/kulado/kulado-kubernetes/pull/371)

### Improvements

-   Add CustomResource to Python SDK (https://github.com/kulado/kulado-kubernetes/pull/543)

### Bug fixes

-   None

## 0.21.1 (March 18, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Major changes

-   None

### Improvements

-   Split up nodejs SDK into multiple files (https://github.com/kulado/kulado-kubernetes/pull/480)

### Bug fixes

-   Check for unexpected RPC ID and return an error (https://github.com/kulado/kulado-kubernetes/pull/475)
-   Fix an issue where the Python `kulado_kubernetes` package was depending on an older `kulado` package.
-   Fix YAML parsing for computed namespaces (https://github.com/kulado/kulado-kubernetes/pull/483)

## 0.21.0 (Released March 6, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Important

Updating to v0.17.0 version of `@kulado/kulado`.  This is an update that will not play nicely
in side-by-side applications that pull in prior versions of this package.

See https://github.com/kulado/kulado/commit/7f5e089f043a70c02f7e03600d6404ff0e27cc9d for more details.

As such, we are rev'ing the minor version of the package from 0.16 to 0.17.  Recent version of `kulado` will now detect, and warn, if different versions of `@kulado/kulado` are loaded into the same application.  If you encounter this warning, it is recommended you move to versions of the `@kulado/...` packages that are compatible.  i.e. keep everything on 0.16.x until you are ready to move everything to 0.17.x.

## 0.20.4 (March 1, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Major changes

-   None

### Improvements

-   Allow the default timeout for awaiters to be overridden (https://github.com/kulado/kulado-kubernetes/pull/457)

### Bug fixes

-   Properly handle computed values in labels and annotations (https://github.com/kulado/kulado-kubernetes/pull/461)

## 0.20.3 (February 20, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Major changes

-   None

### Improvements

-   None

### Bug fixes

-   Move mocha dependencies to devDependencies (https://github.com/kulado/kulado-kubernetes/pull/441)
-   Include managed-by label in diff preview (https://github.com/kulado/kulado-kubernetes/pull/431)

## 0.20.2 (Released February 13, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Major changes

-   None

### Improvements

-   Allow awaiters to be skipped by setting an annotation (https://github.com/kulado/kulado-kubernetes/pull/417)
-   Set managed-by: kulado label on all created resources (https://github.com/kulado/kulado-kubernetes/pull/418)
-   Clean up docstrings for Helm package (https://github.com/kulado/kulado-kubernetes/pull/396)
-   Support explicit `deleteBeforeReplace` (https://github.com/kulado/kulado/pull/2415)

### Bug fixes

-   Fix an issue with variable casing (https://github.com/kulado/kulado-kubernetes/pull/412)
-   Use modified copy of memcache client (https://github.com/kulado/kulado-kubernetes/pull/414)

## 0.20.1 (Released February 6, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Bug fixes

-   Fix namespace handling regression (https://github.com/kulado/kulado-kubernetes/pull/403)
-   Nest Input<T> inside arrays (https://github.com/kulado/kulado-kubernetes/pull/395)

## 0.20.0 (Released February 1, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Major changes

-   Add support for first-class Python providers (https://github.com/kulado/kulado-kubernetes/pull/350)
-   Upgrade to client-go 0.10.0 (https://github.com/kulado/kulado-kubernetes/pull/348)

### Improvements

-   Consider PVC events in Deployment await logic (https://github.com/kulado/kulado-kubernetes/pull/355)
-   Improve info message for Ingress with default path (https://github.com/kulado/kulado-kubernetes/pull/388)
-   Autogenerate Python casing table from OpenAPI spec (https://github.com/kulado/kulado-kubernetes/pull/387)

### Bug fixes

-   Use `node-fetch` rather than `got` to support Node 6 (https://github.com/kulado/kulado-kubernetes/pull/390)
-   Prevent orphaned resources on cancellation during delete (https://github.com/kulado/kulado-kubernetes/pull/368)
-   Handle buggy case for headless Service with no port (https://github.com/kulado/kulado-kubernetes/pull/366)


## 0.19.0 (Released January 15, 2019)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Major changes

-   Implement incremental status updates for `StatefulSet`
    (https://github.com/kulado/kulado-kubernetes/pull/307)
-   Allow the `@kulado/kubernetes` YAML API to understand arbitrary URLs
    (https://github.com/kulado/kulado-kubernetes/pull/328)
-   Add support for `.get` on CustomResources
    (https://github.com/kulado/kulado-kubernetes/pull/329)
-   Add support for `.get` for first-class providers
    (https://github.com/kulado/kulado-kubernetes/pull/340)

### Improvements

-   Fix Ingress await logic for ExternalName Services
    (https://github.com/kulado/kulado-kubernetes/pull/320)
-   Fix replacement logic for Job
    (https://github.com/kulado/kulado-kubernetes/pull/324 and https://github.com/kulado/kulado-kubernetes/pull/324)
-   Fix Cluster/RoleBinding replace semantics
    (https://github.com/kulado/kulado-kubernetes/pull/337)
-   Improve typing for `apiVersion` and `kind`
    (https://github.com/kulado/kulado-kubernetes/pull/341)

## 0.18.0 (Released December 4, 2018)

### Supported Kubernetes versions

- v1.13.x
- v1.12.x
- v1.11.x

### Major changes

-   Allow Helm Charts to have `kulado.Input` in their `values`
    (https://github.com/kulado/kulado-kubernetes/pull/241)

### Improvements

-   Retry REST calls to Kubernetes if they fail, greatly improving resiliance against resorce
    operation ordering problems.
-   Add support for creating CRDs and CRs in the same app
    (https://github.com/kulado/kulado-kubernetes/pull/271,
    https://github.com/kulado/kulado-kubernetes/pull/280)
-   Add incremental await for logic for `Ingress`
    (https://github.com/kulado/kulado-kubernetes/pull/283)
-   Allow users to specify a Chart's source any way they can do it from the CLI
    (https://github.com/kulado/kulado-kubernetes/pull/284)
-   "Fix" "bug" that cases Kulado to crash if there is a duplicate key in a YAML template, to conform
    with Helm's behavior (https://github.com/kulado/kulado-kubernetes/pull/289)
-   Emit better error when the API server is unreachable
    (https://github.com/kulado/kulado-kubernetes/pull/291)
-   Add support for Kubernetes v0.12.\* (https://github.com/kulado/kulado-kubernetes/pull/293)
-   Fix bug that spuriously requires `.metadata.name` to be specified in Kubernetes list types
    (_e.g._, `v1/List`) (https://github.com/kulado/kulado-kubernetes/pull/294,
    https://github.com/kulado/kulado-kubernetes/pull/296)
-   Add Kubernetes v0.13.\* support (https://github.com/kulado/kulado-kubernetes/pull/306)
-   Improve error message when `Service` fails to initialized
    (https://github.com/kulado/kulado-kubernetes/pull/309)
-   Fix bug that causes us to erroneously report `Pod`'s owner
    (https://github.com/kulado/kulado-kubernetes/pull/311)
