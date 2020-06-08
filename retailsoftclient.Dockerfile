FROM node:14.2-alpine as builder

WORKDIR /
COPY client/package.json /package.json
RUN npm install
COPY client /
RUN npm run build

FROM nginx:1.16.0-alpine
WORKDIR /
COPY --from=builder build /usr/share/nginx/html
COPY --from=builder /nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
