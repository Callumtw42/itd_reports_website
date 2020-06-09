#!/bin/bash
IMG=retailsoft

az webapp create -g testing -p testing -n $IMG -i callumacr.azurecr.io/$IMG

az webapp log config \
    --docker-container-logging filesystem \
    --application-logging true \
    --detailed-error-messages true \
    --failed-request-tracing true \
    --name $IMG \
    --resource-group testing

az webapp browse --name $IMG --resource-group testing

az webapp log tail \
    --name $IMG \
    --resource-group testing