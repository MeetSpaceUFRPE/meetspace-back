# BUILD STAGE
FROM node:23-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

# Verifica se o yarn está instalado, e só instala se não estiver presente
RUN if ! command -v yarn &> /dev/null; then npm install -g yarn; fi
RUN yarn install

COPY . .

RUN yarn build

# RUN STAGE
FROM node:23-alpine

WORKDIR /usr/src/app

# Verifica se o yarn está instalado, e só instala se não estiver presente
RUN if ! command -v yarn &> /dev/null; then npm install -g yarn; fi

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/tsconfig*.json ./

EXPOSE 3006

CMD ["yarn", "start:prod"]
