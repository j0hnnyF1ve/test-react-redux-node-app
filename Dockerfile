############################################################
# Dockerfile to build dev environment for App
############################################################

FROM node:boron

MAINTAINER John Pangilinan <john.pangilinan1@gmail.com>

RUN mkdir -p /usr/src/app/
WORKDIR /usr/src/app/

RUN npm install -g nodemon

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app

EXPOSE 8080
EXPOSE 5858

CMD ["npm", "start"]
