docker stop retailsoftclient
docker image rm retailsoftclient
docker container rm retailsoftclient
docker build -t retailsoftclient .
docker run --name retailsoftclient -p 8080:80 retailsoftclient
