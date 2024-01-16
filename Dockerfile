FROM node:21.4-alpine

WORKDIR /app

COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app

RUN npm install

CMD ["npm", "start"]