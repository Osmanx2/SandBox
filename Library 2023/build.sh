#!/bin/sh

cd ./CommentsAPI
sh ./gradlew build

cd ../AuthAPI
dotnet publish -c Release 

cd ../RatingsAPI
go build -o ./build/app

