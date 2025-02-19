# BUILD STAGE
FROM node:23-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# RUN STAGE
FROM node:23-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/tsconfig*.json ./

EXPOSE 3007

CMD ["npm", "run", "start:prod"]