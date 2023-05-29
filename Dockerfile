FROM node:lts-alpine3.16

RUN apk update
RUN apk add docker
# Install docker-compose
# RUN apk add curl
# RUN curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
# RUN chmod +x /usr/local/bin/docker-compose

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]