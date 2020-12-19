FROM node:12.18.1

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Bundle app source
COPY . .

RUN yarn install

EXPOSE 3000

CMD [ "yarn", "start" ]
