# Makefile for shortest-path project

# Output directory
OUTPUT_DIR = ../docs/shortest-path

# Source files by type
TS_FILES = $(shell find . -type f -name "*.ts")
HTML_FILES = $(shell find . -type f -name "*.html")
CSS_FILES = $(shell find . -type f -name "*.css")
JSON_FILES = $(shell find . -type f -name "*.json")
JS_FILES = $(shell find . -type f -name "*.js")
SVG_FILES = $(shell find . -type f -name "*.svg")

# Entry point for JS bundling
ENTRY_POINT = entrypoint.ts

# Icon files
ICON_SVG = icons/path-icon.svg
ICON_FILES = $(OUTPUT_DIR)/icons/icon-72x72.png $(OUTPUT_DIR)/icons/icon-96x96.png \
             $(OUTPUT_DIR)/icons/icon-128x128.png $(OUTPUT_DIR)/icons/icon-144x144.png \
             $(OUTPUT_DIR)/icons/icon-152x152.png $(OUTPUT_DIR)/icons/icon-192x192.png \
             $(OUTPUT_DIR)/icons/icon-384x384.png $(OUTPUT_DIR)/icons/icon-512x512.png \
             $(OUTPUT_DIR)/icons/path-icon.svg

# Static files
STATIC_FILES = favicon.svg main.css manifest.json service-worker.js
STATIC_TARGETS = $(addprefix $(OUTPUT_DIR)/, $(STATIC_FILES))

# Build script
BUILD_SCRIPT = bun run index.ts

# Default target
all: build

# Main build target
build: $(ICON_FILES) $(STATIC_TARGETS) $(OUTPUT_DIR)/index.html $(OUTPUT_DIR)/entrypoint.js

# Create output directory structure
$(OUTPUT_DIR):
	@mkdir -p $(OUTPUT_DIR)

$(OUTPUT_DIR)/icons:
	@mkdir -p $(OUTPUT_DIR)/icons

# Generate icons
$(OUTPUT_DIR)/icons/icon-%.png: $(ICON_SVG) | $(OUTPUT_DIR)/icons
	@$(BUILD_SCRIPT) icons

# Copy icon SVG
$(OUTPUT_DIR)/icons/path-icon.svg: $(ICON_SVG) | $(OUTPUT_DIR)/icons
	@cp $< $@

# Copy static files (individual rules)
$(OUTPUT_DIR)/favicon.svg: favicon.svg | $(OUTPUT_DIR)
	@cp $< $@

$(OUTPUT_DIR)/main.css: main.css | $(OUTPUT_DIR)
	@cp $< $@

$(OUTPUT_DIR)/manifest.json: manifest.json | $(OUTPUT_DIR)
	@cp $< $@

$(OUTPUT_DIR)/service-worker.js: service-worker.js | $(OUTPUT_DIR)
	@$(BUILD_SCRIPT) copy-html index.html

# Process and copy HTML with cache busting
$(OUTPUT_DIR)/index.html: index.html $(OUTPUT_DIR)/main.css $(OUTPUT_DIR)/service-worker.js $(OUTPUT_DIR)/manifest.json | $(OUTPUT_DIR)
	@$(BUILD_SCRIPT) copy-html index.html

# Bundle JavaScript
$(OUTPUT_DIR)/entrypoint.js: $(TS_FILES) | $(OUTPUT_DIR)
	@$(BUILD_SCRIPT) bundle-js entrypoint.ts

# Clean the output directory
clean:
	@$(BUILD_SCRIPT) clean

.PHONY: all build clean