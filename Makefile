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
IHM_TAR = quizz.tar.gz
SAIL_REGISTRY = sailabove.io
SAIL_TAG = $(account)/$(PROJECT)
SAIL = sail

help:
	$(ECHO) "Builder"
	$(ECHO) "make install                  Install the dependancies and prepare environment"
	$(ECHO) "make release                  Generate the release in " $(DIST)
	$(ECHO) "make clean                    Clean the project"
	$(ECHO) "make dist                     Build and package the application"

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
	cd $(DIST)/public && $(TAR) ../../$(IHM_TAR) *

docker: dist
	$(DOCKER) build -t $(PROJECT) .

sail_send: docker
	$(DOCKER) tag -f $(PROJECT) $(SAIL_REGISTRY)/$(SAIL_TAG)
	$(DOCKER) push $(SAIL_REGISTRY)/$(SAIL_TAG)
