FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

ARG DOCKER_PORT

EXPOSE $DOCKER_PORT

CMD [ "npm", "start" ] 