#!/bin/sh

sh build.sh

docker-compose build
docker-compose up -d
