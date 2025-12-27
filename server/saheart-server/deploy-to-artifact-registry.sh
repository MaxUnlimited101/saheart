docker buildx build --platform linux/amd64 --load -t server . && \
docker tag server europe-west3-docker.pkg.dev/saheart-server/saheart-server/saheart-server-image && \
docker push europe-west3-docker.pkg.dev/saheart-server/saheart-server/saheart-server-image