FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# RUN npm install --silent
RUN npm install 

COPY . .

CMD [ "npm", "run", "dev" ]