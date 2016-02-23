PROJECT = brew-it-yourself
NPM ?= npm
DEL = rm -rf
TAR = tar czf
DIST = dist
BUILD = build
DOCKER = docker
GRUNT ?= grunt
ECHO = @echo
BOWER ?= bower
NODE_MODULES = node_modules
BOWER_COMPONENTS = bower_components
DIST_TAR = dist.tar.gz
IHM_TAR = ihm.tar.gz
SAIL_REGISTRY = sailabove.io
SAIL_TAG = $(account)/$(PROJECT)
SAIL = sail

help:
	$(ECHO) "Builder"
	$(ECHO) "make install                  Install the dependancies and prepare environment"
	$(ECHO) "make release                  Generate the release in " $(DIST)
	$(ECHO) "make clean                    Clean the project"
	$(ECHO) "make dist                     Build and package the application"
	$(ECHO) "make sail account=xx          Create a service on Sailabove.io"
	$(ECHO) "make sail-redeploy account=xx redeploy a service on Sailabove.io"

release: install
	$(GRUNT)

$(NODE_MODULES):
	$(NPM) install

$(BOWER_COMPONENTS):
	$(BOWER) install

install: $(NODE_MODULES) $(BOWER_COMPONENTS)

clean:
	$(DEL) $(BUILD) && $(DEL) $(DIST) && $(DEL) $(NODE_MODULES) && $(DEL) $(BOWER_COMPONENTS) && $(DEL) $(DIST_TAR) && $(DEL) $(IHM_TAR)

dist: release
	$(TAR) $(DIST_TAR) $(DIST)
	cd $(DIST)/public && $(TAR) ../../$(IHM_TAR) *

docker: dist
	$(DOCKER) build -t $(PROJECT) .

sail_send: docker
	$(DOCKER) tag -f $(PROJECT) $(SAIL_REGISTRY)/$(SAIL_TAG)
	$(DOCKER) push $(SAIL_REGISTRY)/$(SAIL_TAG)

sail: sail_send
	$(SAIL) service add $(SAIL_TAG) --batch --publish 80:9000 --network predictor --batch $(PROJECT)
	$(SAIL) service start --batch $(SAIL_TAG)

sail-redeploy: sail_send
	$(SAIL) service redeploy --batch $(SAIL_TAG)
	$(SAIL) service start --batch $(SAIL_TAG)
