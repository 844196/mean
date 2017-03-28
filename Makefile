all:
	@mkdir -p data/db data/frontend
	@$(MAKE) -C container/frontend
	@cp -rf container/frontend/index.html data/frontend/index.html
	@cp -rf container/frontend/dist data/frontend/dist
	@docker-compose build
start:
	@docker-compose up -d
log:
	@docker-compose logs -f
stop:
	@docker-compose stop
clean: stop
	@docker-compose rm --force
	@rm -rf ./data/db/*

.PHONY:
	all \
	start \
	log \
	stop \
	clean
