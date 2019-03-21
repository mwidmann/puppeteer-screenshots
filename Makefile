IMAGE_NAME = russmedia/puppeteer-screenshots
.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .
