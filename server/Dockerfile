FROM node:18-alpine

ARG DOCKER_PORT

# Create App Directory
WORKDIR /app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent

# Copy app source code
COPY . .

EXPOSE $DOCKER_PORT

CMD [ "npm", "start" ]