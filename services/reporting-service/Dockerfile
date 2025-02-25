# BUILD STAGE
FROM node:23-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# RUN STAGE
FROM node:23-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app ./

EXPOSE 3008

CMD ["npm", "start"]