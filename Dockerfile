FROM node:lts-alpine3.16

RUN apk update
RUN apk add docker
# Install docker-compose
RUN apk add --no-cache curl py-pip && \
    pip install docker-compose

WORKDIR /app

COPY package.json .

RUN npm i

COPY . .

CMD ["npm", "start"]