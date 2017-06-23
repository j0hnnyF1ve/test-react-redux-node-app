Initializing the Docker Container
=====

docker build -t jpangilinan/node-web-app .
docker run -p 49160:8080 jpangilinan/node-web-app

// Enter the container using a shell
docker ps
docker exec -it <container id> /bin/bash

Links
=====

Dockering a Node JS Application
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
