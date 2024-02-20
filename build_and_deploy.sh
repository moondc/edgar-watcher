#!/bin/bash
#Exit immediately on error
set -e

# Build compiled code
npm install
rm -rf dist
npm run build
rm -rf node_modules
npm install --only=prod

# Set script vars
APP_NAME=$(node -p -e "require('./package.json').name")
npm version patch -f --no-git-tag-version
APP_VERSION=$(node -p -e "require('./package.json').version")
DOCKER_TAG="$APP_NAME-$APP_VERSION"

# Build docker image
echo "Building target for arm64"
docker buildx build --platform linux/arm64 -t $DOCKER_TAG .
echo "Build finished"

# Stop old containers
echo "Stopping all old containers"
OLD_IMAGES=$(ssh "$PI_USER@$PI_IP" 'docker images --filter "reference=$APP_NAME*" --format "{{.ID}}"')
for OLD_IMAGE in $OLD_IMAGES; do
    CONTAINER_IDS=$(ssh "$PI_USER@$PI_IP" "docker ps -q --filter ancestor='$OLD_IMAGE'")
    for CONTAINER_ID in $CONTAINER_IDS; do
        ssh "$PI_USER@$PI_IP" "docker stop '$CONTAINER_ID'"
    done
done
echo "Done stopping old containers"

# Prune old containers and images
echo "Pruning all stopped containers and deleting unused images"
DELETED_ITEMS=$(ssh "$PI_USER@$PI_IP" "docker system prune -a -f")
echo $DELETED_ITEMS
echo "Done pruning"

# Push image to remote server
echo "Pushing to remote"
docker save $DOCKER_TAG | bzip2 | ssh -l $PI_USER $PI_IP docker load
echo "Done pushing"


# Start container with auto restart
echo "Starting Container"
STARTED_CONTAINER=$(ssh "$PI_USER@$PI_IP" "docker run -d --restart unless-stopped -p 3000:3000 \"$DOCKER_TAG\"")
echo "Started container:$STARTED_CONTAINER"