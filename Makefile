export DOCKER_DB_NAME := ng-colkie-db
export DB_NAME := community_channel
export DB_HOST := localhost
export DB_USER := postgres
export DB_PASS := postgres
export DB_PORT := 5432

export SERVICE_NAME := ng-colkie
export SERVICE_PORT := 3000

db-start: 
	docker run --rm \
		--name $(DOCKER_DB_NAME) \
		-e 'POSTGRES_PASSWORD=$(DB_PASS)' \
		-e 'POSTGRES_USER=$(DB_USER)' \
		-e 'POSTGRES_DB=$(DB_NAME)' \
		-p $(DB_PORT):$(DB_PORT) \
		-d postgres:12-alpine

db-client:
	docker exec -it $(DOCKER_DB_NAME) \
		psql -h $(DB_HOST) -U $(DB_USER) -d $(DB_NAME)

db-stop:
	docker stop $(DOCKER_DB_NAME)

build: 
	docker build -t $(SERVICE_NAME) .

