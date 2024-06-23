FROM node:18-alpine

ARG API_URL 
ARG CLIENT_ORIGIN
ENV REACT_APP_API_URL=$API_URL
ENV REACT_APP_CLIENT_ORIGIN=$CLIENT_ORIGIN

WORKDIR /app

COPY package*.json ./

# RUN npm install --silent
RUN npm install 

COPY . .

CMD [ "npm", "start" ] 