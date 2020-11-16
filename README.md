
# opds2 authentification test server

> automatic deployment on google cloud run

## URL
https://opds-auth-test-server-aplqpqv3wa-ey.a.run.app/

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

```
curl -i -X GET http://localhost:8282/local -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE2MDQzODc0OTIsImV4cCI6MTYwNDM4NzU1Mn0.b5guwn9MI8QOV37Ce5KRFSxLotYwNsXpkny4Xa7YQoU"
```

> `brew install jq`

```
curl -X GET http://localhost:8282/local -H "Authorization: Bearer ${TOKEN}" | jq
```

```
curl -i -X POST http://localhost:8282/password -d '{ "username": "admin", "password": "admin", "grant_type": "password"}' -H "Content-Type: application/json"
```

```
curl -i -X POST http://localhost:8282/password -d '{ "refresh_token": "p80LiMxTywHp/frYX67sNFNWYxzfeCVIXIA7jGPta+KeHx5fyW9JgQRSqpsn7ZCs9gyjT0eJfpZhx3x+uw4dEQEYzf5b8irZUOaOIGJVO3ES8VyoI8POA1JgnqBNxOPPKjGwlB1m1pbtX6xx/9RFs0Gf7lDT1CUReALyNXpY7aqB1jz+UV+vQF8N8qteTK9O19ub9xRV3+4GYsWGdqwEuZ8QTj1LfSCahSU8pUGvf3IXFkeT4RzxTdcAJ7rbiLQwz522dR8beZozyWIPi6XjAa6l4rjsPkidpjd4kD9ThhlE5pR5rKAEu7WokVwDj7L8FJ+ntoOOIwSuY38/JAfFHg==", "grant_type": "refresh_token"}' -H "Content-Type: application/json"
```
