FROM node:10

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g @vue/cli
RUN npm install

# EXPOSE 8080

# CMD ["npm", "run", "serve"]
