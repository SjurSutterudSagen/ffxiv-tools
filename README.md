# ffxiv-tools

Sjur's FFXIV Tools

# Docker Compose / local development

Warnings:

- The docker compose file is not yet fully tested.

- The services take a long time to build. 500+ seconds.

## Build and start all services

docker compose up --build

## Build and start in detached mode

docker compose up --build -d

## Stop all services

docker compose down

## View logs

docker compose logs -f

## Check service status

docker compose ps
