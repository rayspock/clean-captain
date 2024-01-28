NAME = clean-captain
BUILD_DIR = dist
.DEFAULT_GOAL := build

default: build

build:
	@echo "*** CleanCaptain: Creating web store package"
	@mkdir -p $(BUILD_DIR)
	@# Zip an archive without including the parent directory
	@cd $(basename src/)/ && zip ../$(BUILD_DIR)/$(NAME).zip -qr *
	@echo "*** CleanCaptain: Package created"
