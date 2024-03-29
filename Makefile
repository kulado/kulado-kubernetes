PROJECT_NAME := Kulado Kubernetes Resource Provider
include build/common.mk

PACK             := kubernetes
PACKDIR          := sdk
PROJECT          := github.com/kulado/kulado-kubernetes
NODE_MODULE_NAME := @kulado/kubernetes

PROVIDER        := kulado-resource-${PACK}
CODEGEN         := kulado-gen-${PACK}
VERSION         ?= $(shell scripts/get-version)
PYPI_VERSION    := $(shell scripts/get-py-version)
KUBE_VERSION    ?= v1.15.0
SWAGGER_URL     ?= https://github.com/kubernetes/kubernetes/raw/${KUBE_VERSION}/api/openapi-spec/swagger.json
OPENAPI_DIR     := pkg/gen/openapi-specs
OPENAPI_FILE    := ${OPENAPI_DIR}/swagger-${KUBE_VERSION}.json

VERSION_FLAGS   := -ldflags "-X github.com/kulado/kulado-kubernetes/pkg/version.Version=${VERSION}"

GO              ?= go
CURL            ?= curl
PYTHON          ?= python

TESTPARALLELISM := 10
TESTABLE_PKGS   := ./pkg/... ./examples/... ./tests/...

$(OPENAPI_FILE)::
	@mkdir -p $(OPENAPI_DIR)
	test -f $(OPENAPI_FILE) || $(CURL) -s -L $(SWAGGER_URL) > $(OPENAPI_FILE)

build:: $(OPENAPI_FILE)
	$(GO) install $(VERSION_FLAGS) $(PROJECT)/cmd/$(PROVIDER)
	$(GO) install $(VERSION_FLAGS) $(PROJECT)/cmd/$(CODEGEN)
	# Delete only files and folders that are generated.
	rm -r sdk/python/kulado_kubernetes/*/ sdk/python/kulado_kubernetes/__init__.py
	for LANGUAGE in "nodejs" "python" ; do \
		$(CODEGEN) $$LANGUAGE $(OPENAPI_FILE) pkg/gen/$${LANGUAGE}-templates $(PACKDIR) || exit 3 ; \
	done
	cd ${PACKDIR}/nodejs/ && \
		yarn install && \
		yarn run tsc
	cp README.md LICENSE ${PACKDIR}/nodejs/package.json ${PACKDIR}/nodejs/yarn.lock ${PACKDIR}/nodejs/bin/
	sed -i.bak 's/$${VERSION}/$(VERSION)/g' ${PACKDIR}/nodejs/bin/package.json
	cd ${PACKDIR}/python/ && \
		if [ $$(command -v pandoc) ]; then \
			pandoc --from=markdown --to=rst --output=README.rst ../../README.md; \
		else \
			echo "error: pandoc is required; please install it and try again"; \
			exit 1; \
		fi && \
		$(PYTHON) setup.py clean --all 2>/dev/null && \
		rm -rf ./bin/ ../python.bin/ && cp -R . ../python.bin && mv ../python.bin ./bin && \
		sed -i.bak -e "s/\$${VERSION}/$(PYPI_VERSION)/g" -e "s/\$${PLUGIN_VERSION}/$(VERSION)/g" ./bin/setup.py && \
		rm ./bin/setup.py.bak && \
		cd ./bin && $(PYTHON) setup.py build sdist

lint::
	golangci-lint run

install::
	GOBIN=$(KULADO_BIN) $(GO) install $(VERSION_FLAGS) $(PROJECT)/cmd/$(PROVIDER)
	[ ! -e "$(KULADO_NODE_MODULES)/$(NODE_MODULE_NAME)" ] || rm -rf "$(KULADO_NODE_MODULES)/$(NODE_MODULE_NAME)"
	mkdir -p "$(KULADO_NODE_MODULES)/$(NODE_MODULE_NAME)"
	cp -r sdk/nodejs/bin/. "$(KULADO_NODE_MODULES)/$(NODE_MODULE_NAME)"
	rm -rf "$(KULADO_NODE_MODULES)/$(NODE_MODULE_NAME)/node_modules"
	rm -rf "$(KULADO_NODE_MODULES)/$(NODE_MODULE_NAME)/tests"
	cd "$(KULADO_NODE_MODULES)/$(NODE_MODULE_NAME)" && \
		yarn install --offline --production && \
		(yarn unlink > /dev/null 2>&1 || true) && \
		yarn link

test_fast::
	./sdk/nodejs/node_modules/mocha/bin/mocha ./sdk/nodejs/bin/tests
	$(GO_TEST_FAST) $(TESTABLE_PKGS)

test_all::
	$(GO_TEST) $(TESTABLE_PKGS)

.PHONY: publish_tgz
publish_tgz:
	$(call STEP_MESSAGE)
	./scripts/publish_tgz.sh

# While kulado-kubernetes is not built using tfgen/tfbridge, the layout of the source tree is the same as these
# style of repositories, so we can re-use the common publishing scripts.
.PHONY: publish_packages
publish_packages:
	$(call STEP_MESSAGE)
	$$(go env GOPATH)/src/github.com/kulado/scripts/ci/publish-tfgen-package .

.PHONY: check_clean_worktree
check_clean_worktree:
	$$(go env GOPATH)/src/github.com/kulado/scripts/ci/check-worktree-is-clean.sh

# The travis_* targets are entrypoints for CI.
.PHONY: travis_cron travis_push travis_pull_request travis_api
travis_cron: all
travis_push: only_build check_clean_worktree publish_tgz only_test publish_packages
travis_pull_request: only_build check_clean_worktree only_test_fast
travis_api: all
