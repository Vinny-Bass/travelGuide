DOCKER_COMPOSE := COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml

NPROCS := 1

ifeq ($(shell uname),Linux)
 NPROCS := $(shell nproc)
else ifeq ($(shell uname),Darwin)
 NPROCS := $(shell sysctl -n hw.physicalcpu)
endif

create-migration: ## create migration
	$(DOCKER_COMPOSE) run npx knex migrate:make $(migration_name)

run-migrations: ## run migrations
	$(DOCKER_COMPOSE) exec -it app-travelguide npm run run-migrations

# start-project: ## start project
# 	$(DOCKER_COMPOSE) up

# create-migrations: ## migrate args can be app name
# 	$(DOCKER_COMPOSE) run --rm web python manage.py makemigrations $(ARGS)

# migrate: ## migrate
# 	$(DOCKER_COMPOSE) run --rm web python manage.py migrate $(ARGS)

# test: ## migrate
# 	$(DOCKER_COMPOSE) run --rm web python manage.py test $(ARGS)

# sync-reqs: ## sync requirements
# 	$(DOCKER_COMPOSE) run --rm web pip freeze > requirements.txt

# create-superuser: ## migrate args can be app name
# 	$(DOCKER_COMPOSE) run --rm web python manage.py createsuperuser