<p align="center">
<img width=350 style="filter: invert(100%);" src="https://raw.githubusercontent.com/brenno-araujo25/reserva-salas-front/9d39de08c68ba96e4153a21c8b259b95ab74cb95/src/assets/meet_space_logo_black.svg">
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
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Rodando localmente](#rodando-localmente)
- [Documentação do API Gateway](#documentação-do-api-gateway)
    - [Endpoints](#endpoints)
        - [Registra usuário](#registra-usuário)
        - [Realiza login](#realiza-login)
        - [Cria sala](#cria-sala)
        - [Lista salas](#lista-salas)
        - [Reserva uma sala](#reserva-uma-sala)
        - [Lista todas as reservas](#lista-todas-as-reservas)

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

## Variáveis de ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env na raiz do projeto:
```bash
# JWT config
JWT_SECRET=jwt_secret_aqui
JWT_EXPIRES_IN=1d

# Postgres config
POSTGRES_DB=postgres
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432

# E-mail config
EMAIL_USER=promonitorufrpe@gmail.com
EMAIL_PASS=icwzxvtviaeuqema

# Ports
USER_SERVICE_PORT=3002
SALA_SERVICE_PORT=3004
RESERVATION_SERVICE_PORT=3003
NOTIFICATION_SERVICE_PORT=3005

# Services URLs
USER_SERVICE_URL=http://user-service:3002
SALA_SERVICE_URL=http://sala-service:3004
NOTIFICATION_SERVICE_URL=http://notification-service:3005
RESERVATION_SERVICE_URL =http://reservation-service:3003 
AVAILABILITY_SERVICE_URL=http://availability-service:3006

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

# Documentação do API Gateway

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

Retorna o token de acesso

---

#### Cria sala

```http
POST /api/salas/create
```

> [!NOTE]
> Esta rota é protegida por um middleware de autenticação. O cliente deve fornecer um token válido no cabeçalho Authorization para acessar este endpoint.

| Body    | Tipo       | Descrição                           |
| :----------- | :--------- | :---------------------------------- |
| `nome`       | `string`   | **Obrigatório**. Nome identificador da sala    |
| `capacidade`      | `int`   | **Obrigatório**. Capacidade máxima da sala   |
| `localizacao`   | `string`   | **Obrigatório**. Andar que a sala pertence   |
| `recursos` | `string[]`   | Lista de recursos, como projetor |

---

#### Lista salas

```http
GET /api/salas/get
```

Retorna a lista de todos as salas cadastradas.

---

#### Reserva uma sala

```http
GET /api/reservations/create
```

> [!NOTE]
> Esta rota é protegida por um middleware de autenticação. O cliente deve fornecer um token válido no cabeçalho Authorization para acessar este endpoint.

| Body | Tipo     | Descrição                       |
| :-------- | :------- | :------------------------------ |
| `salaId`      | `int` | **Obrigatório**. ID da sala  |
| `turno`      | `string` | **Obrigatório**. Turno da reserva (manha, tarde ou noite)  |
| `data`      | `string` | **Obrigatório**. Data da reserva (YYYY-MM-DD)  |

---

#### Lista todas as reservas

```http
GET /api/reservations/get
```

Retorna a lista de todas as reservas de salas.

---

#### Lista reservas de usuário

```http
GET /api/reservations/user
```

> [!NOTE]
> Esta rota é protegida por um middleware de autenticação. O cliente deve fornecer um token válido no cabeçalho Authorization para acessar este endpoint.

Retorna a lista de todas as reservas de salas do usuário autenticado.

---