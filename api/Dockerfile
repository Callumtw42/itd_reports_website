FROM node:14.2-alpine as builder

WORKDIR /
COPY ./package.json /package.json
RUN npm install
COPY ./ /

EXPOSE 8888
CMD ["npm", "start"]