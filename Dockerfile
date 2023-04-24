FROM node:18-alpine3.17 as build
VOLUME /app/dist
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
