# Build the container

podman build \
 --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg BUILD_REVISION=$(git rev-parse --short HEAD) \
 --no-cache \
 -t ffxiv-tools-data-access-api \
 -f packages/data-access-api/Containerfile packages/data-access-api

# Run the container

podman run -p 3001:3001 ffxiv-tools-data-access

# Test the container

curl http://localhost:3001/health
