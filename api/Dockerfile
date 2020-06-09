FROM node:14.2-alpine as builder

WORKDIR /
COPY /package.json /package.json
RUN npm install
COPY server.js /
COPY sql /sql

EXPOSE 8888
CMD ["node",  "./server", "192.168.0.14", "root"]