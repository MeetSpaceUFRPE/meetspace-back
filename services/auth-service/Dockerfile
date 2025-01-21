# BUILD STAGE
FROM node:23-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build

# RUN STAGE
FROM node:23-alpine

RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/tsconfig*.json ./

EXPOSE 3001

CMD ["pnpm", "run", "start:prod"]