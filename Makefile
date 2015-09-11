BIN = ./node_modules/.bin
BROWSERIFY = $(BIN)/browserify
WATCHIFY = $(BIN)/watchify
ESLINT = $(BIN)/eslint
BABELIFY = babelify

SOURCE = app/scripts/app.js
TARGET = dist/scripts/app.js

SCRIPTS = $(shell find app/scripts -name "*.js")

scripts: $(TARGET)
$(TARGET): $(SCRIPTS) node_modules
	mkdir -p $(@D)
	$(BROWSERIFY) $(SOURCE) -o $(TARGET) -t [ $(BABELIFY) ]

html: dist/index.html
dist/index.html: app/index.html
	mkdir -p $(@D)
	cp $< $@

CSS_FILES = $(shell find app/styles -name '*.css')
CSS = $(CSS_FILES:app/styles/%.css=dist/styles/%.css)
css: $(CSS)
dist/styles/%.css: app/styles/%.css
	mkdir -p $(@D)
	cp $< $@

FONTS = $(shell find app/fonts)
fonts: dist/fonts
dist/fonts: app/fonts
	mkdir -p $(@D)
	cp -r $< $@

watch:
	$(WATCHIFY) --verbose -o $(TARGET) -t [ $(BABELIFY) ] -- $(SCRIPTS)

bundle: compile dist/scripts/bundle.js
dist/scripts/bundle.js: dist/scripts/app.js
	java -jar share/compiler.jar --js $< --js_output_file $@ --language_in ECMASCRIPT5 --compilation_level SIMPLE_OPTIMIZATIONS

lint:
	$(ESLINT) $(SCRIPTS)

test:
	NODE_ENV=testing npm test

install:
	npm install

compile: scripts html css fonts

.PHONY: bundle install compile watch lint scripts css html test
