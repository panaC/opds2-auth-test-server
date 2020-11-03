
# opds2 authentification test server

## require 

- docker-desktop for macOs


## architecture

- r2-streamer-js run on port 8181

```
cd streamer-server
./run.sh

```

- epub-server run on port 8080
```

cd epub-server
./run.sh
```


- opds-server run on port 8282
```
cd opds2-auth-test-server
npm install
npm run start:dev # watch mode
```


## test in thorium reader

add `http://localhost:8282/` in 'catalog'


## test with curl

> Basic admin:admin
```
curl -i X GET http://localhost:8282/basic -H "Authorization: Basic YWRtaW46YWRtaW4="
```

```
curl -i -X POST http://localhost:8282/local -d '{"username": "admin", "password": "admin"}' -H "Content-Type: application/json"
```

> `brew install jq`

```
curl -i -X GET http://localhost:8282/local -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE2MDQzODc0OTIsImV4cCI6MTYwNDM4NzU1Mn0.b5guwn9MI8QOV37Ce5KRFSxLotYwNsXpkny4Xa7YQoU" | jq
```
