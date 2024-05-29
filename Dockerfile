FROM node:lts AS builder
COPY 02-package.json /app/package.json
COPY 01-server.js /app/server.js
WORKDIR /app
RUN npm install
CMD node server.js