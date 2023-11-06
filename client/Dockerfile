FROM node:18-alpine

ARG SERVER_ORIGIN
ARG DOCKER_PORT

ENV REACT_APP_API_URL=$SERVER_ORIGIN

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE $DOCKER_PORT

CMD [ "npm", "start" ] 