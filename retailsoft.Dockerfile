FROM node:14.3-alpine
COPY package.json /package.json
RUN npm install
COPY public /public 
COPY sql /sql
COPY src /src
COPY server.js /
COPY tsconfig.json /
RUN npm run build
CMD ["npm", "run", "server"]