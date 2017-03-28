all:
	@docker build -t build-container .
	@docker run --rm -v "$$PWD":/src -w /src build-container bash -c \
		'npm install && npm run build'

.PHONY: all
