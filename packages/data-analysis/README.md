# Build the container

podman build \
 --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
 --build-arg BUILD_REVISION=$(git rev-parse --short HEAD) \
 --progress=plain \
 -t ffxiv-tools-data-analysis \
 -f packages/data-analysis/Containerfile .

## Ignore cache

podman build \
 --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg BUILD_REVISION=$(git rev-parse --short HEAD) \
 --no-cache \
 --progress=plain \
 -t ffxiv-tools-data-analysis \
 -f packages/data-analysis/Containerfile .

# Run the container

podman run -p 3002:3002 ffxiv-tools-data-analysis

# Test the container

curl http://localhost:3001/health
