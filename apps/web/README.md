# Build the container

podman build \
 --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg BUILD_REVISION=$(git rev-parse --short HEAD) \
 -t ffxiv-tools-web \
 -f apps/web/Containerfile .

# Run the container in docker

podman run -p 3000:3000 ffxiv-tools-web
