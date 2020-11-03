#!/bin/sh

PWD=`pwd`

docker run \
	-it \
	--rm \
	-p 8181:3000 \
	--name streamer \
	panac/r2-streamer-js:1.0

