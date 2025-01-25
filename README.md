# ffxiv-tools

Sjur's FFXIV Tools

# Podman Compose / local development

Warnings:

- The Podman compose file and Containerfiles are not yet fully tested.

## Start the services

Podman compose up

### For development with auto-rebuild

Podman compose watch

## Build and start all services

Podman compose up --build

## Build and start in detached mode

Podman compose up --build -d

## Stop all services

Podman compose down

## View logs

Podman compose logs -f

## Check service status

Podman compose ps
