FROM node:14.2-alpine as builder

WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY server.js /app
COPY /sql /app/sql

EXPOSE 8080
CMD ["npm", "start"]