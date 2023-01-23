FROM node:latest

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "node", "server.js" ]

# Build Docker Image
# sudo docker build -t expressimg .

# Run Docker Container using created image
# docker run -d -p 3000:3000 expressimg



# docker run -p 27017:27017 --name some-mongo -d mongo

