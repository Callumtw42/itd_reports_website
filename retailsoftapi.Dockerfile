FROM node:14.2-alpine as builder

WORKDIR /
COPY api/package.json /package.json
RUN npm install
COPY api /

EXPOSE 8888
CMD ["npm", "start"]