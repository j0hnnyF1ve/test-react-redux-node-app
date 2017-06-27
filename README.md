Initializing the Docker Container
=====

docker build -t jpangilinan/node-web-app .
docker run jpangilinan/node-web-app
-or-
docker-compose up

// Enter the container using a shell
docker ps
docker exec -it <container id> /bin/bash

Libraries
=====
Handlebars for Express.js
https://www.npmjs.com/package/express-handlebars

React.js
https://facebook.github.io/react/

Redux.js
http://redux.js.org/

Bootstrap for some simple Layout
http://getbootstrap.com/

Links
=====

Dockering a Node JS Application
https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

Live Debugging a Node JS Application
https://blog.docker.com/2016/07/live-debugging-docker/

Using Express.js to host multiple (static) websites
http://shamadeh.com/blog/web/nodejs/express/2014/07/20/ExpressMultipleSites.html

Node Express Multiapp Demo
https://github.com/hitokun-s/node-express-multiapp-demo

DigitalOcean: How to set up a Node.js application for production on Ubuntu
https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04

DigitalOcean: How to host multiple Node.js applications on a single vps with Nginx Forever and Crontab
https://www.digitalocean.com/community/tutorials/how-to-host-multiple-node-js-applications-on-a-single-vps-with-nginx-forever-and-crontab
