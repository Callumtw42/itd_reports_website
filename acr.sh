
#!/bin/bash
IMAGE=retailsoft
REPO=itd_reports_website

GIT_USER=callumtw42                              # Your GitHub user account name
GIT_PAT=098cabfcdfedc0ec7a8592ab2c5b5b33793a80c9 # The PAT you generated in the previous section

# docker build -f $IMAGE.Dockerfile -t $IMAGE .  
# docker tag $IMAGE callumacr.azurecr.io/$IMAGE
# docker push callumacr.azurecr.io/$IMAGE

# az acr task create \
#     --registry callumacr.azurecr.io/$IMAGE \
#     --name $IMAGE \
#     --image $IMAGE:latest \
#     --context https://github.com/$GIT_USER/$REPO.git \
#     --file $IMAGE.Dockerfile \
#     --git-access-token $GIT_PAT

az acr task run --registry callumacr.azurecr.io/$IMAGE --name $IMAGE