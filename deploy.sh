SUBSCRIPTION="Pay-As-You-Go"
RESOURCEGROUP="appsvc_linux_centralus"
LOCATION="centralus"
PLANNAME="appsvc_linux_centralus"
PLANSKU="F1"
SITENAME="itdreports3"
RUNTIME="NODE|14-lts"

# login supports device login, username/password, and service principals
# see https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest#az_login
az webapp config appsettings set --name itdreports3 --resource-group appsvc_linux_centralus --settings CUSTOM_BUILD_COMMAND="./build.sh"

# To set up deployment from a local git repository, uncomment the following commands.
# first, set the username and password (use environment variables!)
# USERNAME=""
# PASSWORD=""
# az webapp deployment user set --user-name $USERNAME --password $PASSWORD

# now, configure the site for deployment. in this case, we will deploy from the local git repository
# you can also configure your site to be deployed from a remote git repository or set up a CI/CD workflow
# az webapp deployment source config-local-git --name $SITENAME --resource-group $RESOURCEGROUP

# the previous command returned the git remote to deploy to
# use this to set up a new remote named "azure"
# git remote add azure "https://$USERNAME@$SITENAME.scm.azurewebsites.net/$SITENAME.git"
# push master to deploy the site
# git push azure master

# browse to the site
# az webapp browse --name $SITENAME --resource-group $RESOURCEGROUP
