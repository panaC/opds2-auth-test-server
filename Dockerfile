
FROM node:12 as builder
WORKDIR /opds-server
COPY . ./
RUN npm install
RUN npm run build


FROM node:12-slim
WORKDIR /opds-server
COPY --from=builder /opds-server ./
EXPOSE ${PORT}
CMD npm run start:prod
