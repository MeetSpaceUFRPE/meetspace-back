## Variáveis de Ambiente

```bash
POSTGRES_DB=postgres
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
NOTIFICATION_SERVICE_PORT=3005
EMAIL_USER=promonitorufrpe@gmail.com
EMAIL_PASS=icwzxvtviaeuqema
```

# Serviço de Notificação 

Este projeto implementa um serviço de notificação, o qual envia um e-mail informando o cancelamento ou confirmação de uma reserva. O serviço é construído utilizando **Node.js** com **Express**, **PostgreSQL** como banco de dados, e Docker para orquestração dos serviços.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução JavaScript para criar o backend do serviço.
- **Express**: Framework minimalista para Node.js, usado para gerenciar as rotas e controle de API.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações das salas.
- **Docker**: Ferramenta de contêiner para facilitar o desenvolvimento e a implantação do serviço.
- **Docker Compose**: Orquestração de containers Docker para facilitar a execução de múltiplos serviços (PostgreSQL, API Gateway, etc.).
- **CORS**: Middleware para permitir que o serviço seja acessado de diferentes origens.

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

4. O serviço de salas estará rodando na porta `3005`, e a API Gateway estará na porta `3000`.

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

### 1. Notificar uma confirmação de reserva

- **Método**: `POST`
- **Rota**: `/api/notificacao/confirmacao/:user_id/:reserva_id`
- **Params**:

- `user_id`: ID do usuário que fez a reserva.
- `reserva_id`: ID da reserva confirmada ou cancelada.

- **Resposta (sucesso)**:
  ```json
  {
    
  }
  ```

- **Resposta (erro)**:
  ```json
  {
    "error": "Erro ao enviar notificação: <detalhes do erro>"
  }
  ```
### 2. Notificar um cancelamento de reserva

- **Método**: `POST`
- **Rota**: `/api/notificacao/cancelamento/:user_id/:reserva_id`
- **Params**:

- `user_id`: ID do usuário que fez a reserva.
- `reserva_id`: ID da reserva confirmada ou cancelada.

- **Resposta (sucesso)**:
  ```json
  {
    
  }
  ```

- **Resposta (erro)**:
  ```json
  {
    "error": "Erro ao enviar notificação: <detalhes do erro>"
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