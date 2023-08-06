FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

# RUN npm install --global nodemon

COPY . .

ARG DOCKER_PORT

EXPOSE $DOCKER_PORT

CMD [ "npm", "start" ]