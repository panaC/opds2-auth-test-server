
FROM node:10.23-slim

WORKDIR /opds-server

COPY . ./

RUN npm install

CMD npm run start
