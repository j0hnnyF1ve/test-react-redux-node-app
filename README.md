Initializing the Docker Container
=====

docker build -t jpangilinan/node-web-app .
docker run jpangilinan/node-web-app
-or-
docker-compose up

// Enter the container using a shell
docker ps
docker exec -it <container id> /bin/bash

Links
=====

Dockering a Node JS Application
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

Live Debugging a Node JS Application
https://blog.docker.com/2016/07/live-debugging-docker/
