IMG=retailsoft

docker stop $IMG
docker image rm $IMG
docker container rm $IMG
docker build -f $IMG.Dockerfile -t $IMG .
docker run --name $IMG -p 8080:8080 $IMG
