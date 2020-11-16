
FROM node:10

WORKDIR /opds-server

COPY . ./

RUN npm install

CMD npm run start
