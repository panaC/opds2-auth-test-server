
FROM node:10

WORKDIR /opds-server

COPY . ./

RUN npm install

EXPOSE ${PORT}

CMD npm run start
