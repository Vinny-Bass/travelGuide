#!/bin/sh
docker-compose build --no-cache

docker-compose up -d
sleep 10

docker exec -it app-travelguide npm run run-migrations