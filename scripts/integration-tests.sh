#!/usr/bin/env bash
set -e

# export required envs
source ./scripts/start/envs.sh

# run Unlock Protocol stack
sh -c "./scripts/start-infra.sh"

# run the actual tests
echo "Running integration tests \n"
COMMAND="yarn workspace tests ci --network docker"
docker-compose $COMPOSE_CONFIG build integration-tests
docker-compose $COMPOSE_CONFIG run -e UNLOCK_ENV=test -e CI=true $EXTRA_ARGS integration-tests bash -c "$COMMAND"
