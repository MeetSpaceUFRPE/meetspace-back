## Variáveis de Ambiente

```bash
POSTGRES_DB=postgres
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
SALA_SERVICE_PORT=3004
```

```markdown
# Serviço de Salas - Reserva de Salas

Este projeto implementa um serviço de gerenciamento de salas, onde você pode criar, listar e atualizar informações de salas disponíveis para reserva. O serviço é construído utilizando **Node.js** com **Express**, **PostgreSQL** como banco de dados, e Docker para orquestração dos serviços.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução JavaScript para criar o backend do serviço.
- **Express**: Framework minimalista para Node.js, usado para gerenciar as rotas e controle de API.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações das salas.
- **Sequelize**: ORM para interagir com o banco de dados PostgreSQL.
- **Docker**: Ferramenta de contêiner para facilitar o desenvolvimento e a implantação do serviço.
- **Docker Compose**: Orquestração de containers Docker para facilitar a execução de múltiplos serviços (PostgreSQL, API Gateway, etc.).
- **CORS**: Middleware para permitir que o serviço seja acessado de diferentes origens.

## Estrutura do Projeto

```plaintext
/reserva-salas-back
├── api-gateway/                  # API Gateway para redirecionamento das requisições
├── services/                     
│   ├── auth-service/             # Serviço de Autenticação
│   ├── user-service/             # Serviço de Usuários
│   └── sala-service/             # Serviço de Salas
├── docker-compose.yml            # Arquivo de orquestração dos containers
├── services/sala-service/Dockerfile # Dockerfile para o serviço de salas
├── services/sala-service/src/    # Código-fonte do serviço de salas
└── README.md                     # Este arquivo
```

## Como Rodar o Projeto

### Pré-requisitos

- [Docker](https://www.docker.com/get-started) instalado.
- [Docker Compose](https://docs.docker.com/compose/install/) instalado.

### Passos para rodar o projeto

1. Clone este repositório:

   ```bash
   git clone https://github.com/usuario/reserva-salas-back.git
   cd reserva-salas-back
   ```

2. Certifique-se de que todos os serviços estão configurados corretamente. O `docker-compose.yml` já está configurado para executar todos os serviços necessários.

3. Execute o comando para iniciar os containers do Docker:

   ```bash
   docker-compose up --build
   ```

4. O serviço de salas estará rodando na porta `3004`, e a API Gateway estará na porta `3000`.

5. Para acessar o banco de dados, você pode se conectar ao PostgreSQL através do Docker usando o comando:

   ```bash
   docker exec -it postgres bash
   psql -U postgres -d postgres
   ```

### Variáveis de Ambiente

O serviço de salas utiliza a variável de ambiente `DATABASE_URL` para se conectar ao banco de dados PostgreSQL. A URL de conexão no arquivo `docker-compose.yml` está configurada da seguinte forma:

```bash
DATABASE_URL=postgres://postgres:postgres@db:5432/postgres
```

## Como Usar as Rotas

### 1. Criar uma Sala

- **Método**: `POST`
- **Rota**: `/api/salas`
- **Body** (JSON):
  ```json
  {
    "nome": "Sala de Reunião 1",
    "capacidade": 10,
    "localizacao": "Bloco A, andar 2",
    "recursos": ["Projetor", "Quadro Branco"]
  }
  ```

- **Resposta (sucesso)**:
  ```json
  {
    "id": 1,
    "nome": "Sala de Reunião 1",
    "capacidade": 10,
    "localizacao": "Bloco A, andar 2",
    "recursos": ["Projetor", "Quadro Branco"],
    "createdAt": "2025-01-24T00:00:00.000Z",
    "updatedAt": "2025-01-24T00:00:00.000Z"
  }
  ```

- **Resposta (erro)**:
  ```json
  {
    "error": "Erro ao criar sala: <detalhes do erro>"
  }
  ```

### 2. Listar Salas

- **Método**: `GET`
- **Rota**: `/api/salas`

- **Resposta (sucesso)**:
  ```json
  [
    {
      "id": 1,
      "nome": "Sala de Reunião 1",
      "capacidade": 10,
      "localizacao": "Bloco A, andar 2",
      "recursos": ["Projetor", "Quadro Branco"],
      "createdAt": "2025-01-24T00:00:00.000Z",
      "updatedAt": "2025-01-24T00:00:00.000Z"
    },
    {
      "id": 2,
      "nome": "Sala de Reunião 2",
      "capacidade": 12,
      "localizacao": "Bloco B, andar 1",
      "recursos": ["Televisão", "Cadeiras confortáveis"],
      "createdAt": "2025-01-24T00:00:00.000Z",
      "updatedAt": "2025-01-24T00:00:00.000Z"
    }
  ]
  ```

### 3. Atualizar uma Sala

- **Método**: `PUT`
- **Rota**: `/api/salas/:salaId`
- **Parâmetros**:
  - `salaId` (ID da sala a ser atualizada)
- **Body** (JSON):
  ```json
  {
    "nome": "Sala de Reunião Atualizada",
    "capacidade": 15,
    "localizacao": "Bloco A, andar 3",
    "recursos": ["Projetor", "Cadeiras confortáveis"]
  }
  ```

- **Resposta (sucesso)**:
  ```json
  {
    "id": 1,
    "nome": "Sala de Reunião Atualizada",
    "capacidade": 15,
    "localizacao": "Bloco A, andar 3",
    "recursos": ["Projetor", "Cadeiras confortáveis"],
    "createdAt": "2025-01-24T00:00:00.000Z",
    "updatedAt": "2025-01-24T00:00:00.000Z"
  }
  ```

- **Resposta (erro)**:
  ```json
  {
    "error": "Erro ao atualizar sala: <detalhes do erro>"
  }
  ```

## Como Contribuir

1. Fork este repositório.
2. Crie uma branch para sua feature: `git checkout -b minha-feature`.
3. Faça as alterações e commite-as: `git commit -am 'Adicionando nova feature'`.
4. Envie para o repositório: `git push origin minha-feature`.
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
```

### O que foi corrigido:

1. A estrutura de pastas foi organizada para refletir a estrutura do projeto corretamente.
2. A seção "Como Usar as Rotas" agora está mais clara e segue um padrão consistente de rotas.
3. O código de exemplo foi formatado de forma adequada.

Com isso, o `README.md` está mais claro e estruturado, facilitando a navegação e compreensão para outros desenvolvedores que possam colaborar ou utilizar o projeto.