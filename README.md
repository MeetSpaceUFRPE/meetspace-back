<p align="center">
<img width=350 src="https://raw.githubusercontent.com/brenno-araujo25/reserva-salas-front/9d39de08c68ba96e4153a21c8b259b95ab74cb95/src/assets/meet_space_logo_black.svg">
</p>

<div align="center">

[![Frontend Repository](https://img.shields.io/badge/Frontend-Repository-blue?style=flat&logo=github)](https://github.com/brenno-araujo25/reserva-salas-front)
[![Figma Prototype](https://img.shields.io/badge/Figma-Prototype-orange?style=flat&logo=figma)](https://www.figma.com/design/Wx8cYqnzoswLNzcEFFodug/Projeto-SD)

![Node.js](https://img.shields.io/badge/Node.js-v23.0.0-green?style=flat&logo=node.js)
![NestJS](https://img.shields.io/badge/NestJS-v10.0.0-red?style=flat&logo=nestjs)
![Flask](https://img.shields.io/badge/Flask-v3.1.0-white?style=flat&logo=flask)
![Python](https://img.shields.io/badge/Python-v3.9-blue?style=flat&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v15-blue?style=flat&logo=postgresql)
![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat&logo=docker)

</div>

# MeetSpace

O MeetSpace é um sistema distribuído de gestão de reservas de salas de reunião. Este sistema poderia ser utilizado por empresas para organizar a reserva e uso de salas de reuniões em um escritório.

# Índice

- [Funcionalidades](#funcionalidades)
- [Microserviços](#microserviços)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rodando localmente](#rodando-localmente)
- [Documentação da API](#documentação-da-api)
    - [Endpoints](#endpoints)
        - [Registra usuário](#registra-usuário)
        - [Realiza login](#realiza-login)
        - [Cria usuário](#cria-usuário)
        - [Lista usuários](#lista-usuários)
        - [Consulta usuário por ID](#consulta-usuário-por-id)
        - [Consulta usuário por Email](#consulta-usuário-por-email)
        - [Atualiza dados do usuário](#atualiza-dados-do-usuário)
        - [Deleta usuário](#deleta-usuário)

## Funcionalidades

- Reservar salas de reunião.
- Cancelar reservas.
- Verificar a disponibilidade de salas.
- Receber notificações sobre suas reservas.

## Microserviços

1. Serviço de Autenticação e Autorização
Gerencia login, cadastro e controle de acesso.
Autentica usuários antes de acessar os outros serviços.

2. Serviço de Gerenciamento de Usuários
Mantém informações dos usuários, como nome, e-mail e departamento.
Permite a atualização do perfil.

3. Serviço de Gerenciamento de Salas
Registra e mantém os dados das salas (nome, capacidade, localização, recursos como projetor).
Atualiza informações sobre novas salas ou manutenção.
Funcionalidades: Listar salas disponíveis, criar e editar salas.

4. Serviço de Reservas
Gerencia a lógica de criação, atualização e cancelamento de reservas.
Verifica conflitos de horários e disponibilidade de salas.
Funcionalidade: Criar reserva para uma sala específica.

5. Serviço de disponibilidade
Fornece a lógica para verificar a disponibilidade de salas em um período específico. 
Pode ser otimizado com cache para acelerar consultas frequentes.
Funcionalidade: Verificar se uma sala está livre em determinado período.

6. Serviço de Notificações
Envia notificações por e-mail sobre confirmações, alterações ou cancelamentos de reservas.

7. Serviço de Calendário
Centraliza a visualização de todas as reservas por sala e usuário.
Funcionalidade: Exibir cronograma diário de uma sala.

8. Serviço de Relatórios
Gera relatórios de uso das salas, como frequência de reservas e ocupação média.
Funcionalidade: Relatório mensal de uso de salas.

9. Serviço de Logs e Monitoramento
Registra todas as ações e eventos no sistema para auditoria e monitoramento.
Gera logs de quem fez reservas ou cancelamentos.

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

Em auth-service:
```
JWT_SECRET=seu_secret_aqui
JWT_EXPIRATION=1d
USER_SERVICE_URL=http://user-service:3002
```

Em user-service:
```
POSTGRES_DB=postgres
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
USER_SERVICE_PORT=3002
```

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/brenno-araujo25/reserva-salas
```

Entre no diretório do projeto

```bash
  cd reserva-salas
```

Inicie os contêineres

```bash
  docker-compose up --build
```

# Documentação da API

## Endpoints

#### Registra usuário

```http
  POST /api/auth/auth/register
```

| Body   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |
| `department` | `string` | **Obrigatório**. Departamento do usuário |

---

#### Realiza login

```http
  POST /api/auth/auth/login
```

| Body   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `email`      | `string` | **Obrigatório**. Email do usuário |
| `password`      | `string` | **Obrigatório**. Senha do usuário |

---

#### Cria usuário

```http
POST /api/users/users
```

| Body    | Tipo       | Descrição                           |
| :----------- | :--------- | :---------------------------------- |
| `name`       | `string`   | **Obrigatório**. Nome do usuário    |
| `email`      | `string`   | **Obrigatório**. Email do usuário   |
| `password`   | `string`   | **Obrigatório**. Senha do usuário   |
| `department` | `string`   | **Obrigatório**. Departamento do usuário |

---

#### Lista usuários

```http
GET /api/users/users
```

Retorna a lista de todos os usuários cadastrados.

---

#### Consulta usuário por ID

```http
GET /api/users/users/:id
```

| Parâmetro | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do usuário  |

Retorna os dados do usuário correspondente ao `id`.

---

#### Consulta usuário por Email

```http
GET /api/users/users/email/:email
```

| Parâmetro | Tipo     | Descrição                        |
| :-------- | :------- | :------------------------------- |
| `email`   | `string` | **Obrigatório**. Email do usuário |

Retorna os dados do usuário correspondente ao `email`.

---

#### Atualiza dados do usuário

```http
PUT /api/users/users/:id
```

| Parâmetro | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do usuário  |

| Body        | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name`      | `string`   | **Opcional**. Nome do usuário       |
| `email`     | `string`   | **Opcional**. Email do usuário      |
| `password`  | `string`   | **Opcional**. Senha do usuário      |
| `department`| `string`   | **Opcional**. Departamento do usuário |

Atualiza os dados do usuário correspondente ao `id`.

---

#### Deleta usuário

```http
DELETE /api/users/users/:id
```

| Parâmetro | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do usuário  |

Remove o usuário correspondente ao `id`.
