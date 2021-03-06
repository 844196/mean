all: ## Setup application
	@mkdir -p data/db data/frontend
	@$(MAKE) -C container/frontend
	@cp -rf container/frontend/index.html data/frontend/index.html
	@cp -rf container/frontend/dist/ data/frontend/dist/
	@docker-compose build
start: ## Start application
	@docker-compose up -d $(SERVICE)
log: ## Tail application logs
	@docker-compose logs -f
stop: ## Stop application
	@docker-compose stop
clean: stop ## Delete application containers
	@docker-compose rm --force
dump: ## Dump database
	@tar -zcvf dump-`date '+%Y%m%d%H%M%S'`.tar.gz data/db/
help: ## Show this help
	@awk 'BEGIN{FS=" *:.*## "}/^[a-zA-Z_-]+ *:.* ## .+$$/{printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' Makefile

.PHONY:
	help \
	all \
	start \
	log \
	stop \
	dump \
	clean
