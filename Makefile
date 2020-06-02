NAME = CleanCaptain
BUILD_DIR = dist/
BUILD_FILE = $(BUILD_DIR)/$(NAME).zip 
.DEFAULT_GOAL := build

build:
	echo "*** CleanCaptain: Creating web store package"
	mkdir -p $(BUILD_DIR)
	cd $(basename src/)/ && zip ../$(BUILD_FILE) -qr * 
