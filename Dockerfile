FROM node:current-alpine3.17 as dev
WORKDIR /src/app
COPY package*.json .
RUN npm i
COPY . .
CMD ["npm", "start"]