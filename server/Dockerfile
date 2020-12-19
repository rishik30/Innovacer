FROM node:12.18.1

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

# Install app dependencies
RUN yarn install

EXPOSE 5000

CMD [ "yarn", "start" ]
