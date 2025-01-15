# Build the container

docker build \
 --build-arg BUILD_DATE=$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
  --build-arg BUILD_REVISION=$(git rev-parse --short HEAD) \
 --no-cache \
 -t ffxiv-tools-data-access \
 -f services/data-access/Dockerfile services/data-access

# Run the container

docker run -p 3001:3001 ffxiv-tools-data-access

# Test the container

curl http://localhost:3001/health
