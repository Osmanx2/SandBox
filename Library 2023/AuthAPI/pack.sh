#!/bin/sh
dotnet publish -c Release 
docker image build -t auth-api:latest --no-cache -f "Dockerfile quick" "bin/Release/net5.0/publish";