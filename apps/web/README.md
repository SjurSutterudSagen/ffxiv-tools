# Build the container

docker build -t ffxiv-tools-web -f apps/web/Dockerfile .

# Run the container in docker

docker run -p 3000:3000 ffxiv-tools-web
