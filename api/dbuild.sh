docker stop retailsoftapi
docker image rm retailsoftapi
docker container rm retailsoftapi
docker build -t retailsoftapi .
docker run --name retailsoftapi -p 8888:8888 retailsoftapi
