FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY ./src ./src
COPY ./public ./public

RUN npm install --silent

EXPOSE 3000

CMD [ "npm", "start" ] 