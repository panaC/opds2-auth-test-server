#!/bin/sh

PWD=`pwd`

docker run \
	-it \
	--rm \
	-p 8080:80 \
	-v "$PWD/ngnix.conf:/etc/nginx/nginx.conf:ro" \
	-v "$PWD/static:/www/data:ro" \
	--name web \
	nginx
