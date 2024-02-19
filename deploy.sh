#!/bin/bash

if [ "$#" -eq 0 ]; then
    echo "No commands specified, Usage:"
    echo "-l build for local"
    echo "-p push to remote after building"
    exit
fi

#clean up node_modules so that docker image doesn't contain unnecessary dependencies
npm install
rm -rf dist
npm run build
rm -rf node_modules
npm install --only=prod

APP_NAME=$(node -p -e "require('./package.json').name")
APP_VERSION=$(node -p -e "require('./package.json').version")
DOCKER_TAG="$APP_NAME-$APP_VERSION"

if [[ "$@" =~ "-l" ]]; then
    docker build -t $DOCKER_TAG .
else
    docker buildx build --platform linux/arm64 -t $DOCKER_TAG .
fi


if [[ "$@" =~ "-p" ]]; then
    docker save $DOCKER_TAG | bzip2 | ssh -l $PI_USER $PI_IP docker load
fi