# 1. Imagem base com Node.js
FROM node:23-alpine

# 2. Definir diretório de trabalho dentro do container
WORKDIR /usr/src/app

# 3. Copiar os arquivos de dependências (package.json e yarn.lock) para o container
COPY package.json yarn.lock ./

# 4. Instalar as dependências usando Yarn
RUN yarn install

# 5. Copiar o restante do código-fonte para dentro do container
COPY . .

# 6. Expor a porta em que a aplicação vai rodar (3004, por exemplo)
EXPOSE 3004

# 7. Definir o comando para iniciar a aplicação
CMD ["yarn", "start"]
