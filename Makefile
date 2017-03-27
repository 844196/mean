install:
	@mkdir -p data/db
container.start: install
	@docker-compose up --build
container.status:
	@docker-compose ps
container.stop:
	@docker-compose stop
container.clean: container.stop
	@docker-compose rm --force
db.clean: container.clean
	@rm -rf ./data/db/*

.PHONY:
	install \
	container.start \
	container.status \
	container.stop \
	db.clean
