# Build the container

docker build \
 --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg BUILD_REVISION=$(git rev-parse --short HEAD) \
 --no-cache \
 -t ffxiv-tools-storage \
 -f services/storage/Dockerfile services/storage

# Run the container

docker run -p 3002:3002 ffxiv-tools-storage

# Test the container

curl http://localhost:3001/health
