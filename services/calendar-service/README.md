## Variáveis de Ambiente

```bash
POSTGRES_DB=postgres
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
CALENDAR_SERVICE_PORT=3007
EMAIL_USER=promonitorufrpe@gmail.com
EMAIL_PASS=icwzxvtviaeuqema
```

## Serviço de Calendário

Serviço de calendário para centralizar a visualização de todas as reservas por sala e usuário.

## Tecnologias Usadas

- **Node.js**: Ambiente de execução JavaScript para criar o backend do serviço.
- **Express**: Framework minimalista para Node.js, usado para gerenciar as rotas e controle de API.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar as informações das reservas.
- **Docker**: Ferramenta de contêiner para facilitar o desenvolvimento e a implantação do serviço.
- **Docker Compose**: Orquestração de containers Docker para facilitar a execução de múltiplos serviços (PostgreSQL, API Gateway, etc.).
- **CORS**: Middleware para permitir que o serviço seja acessado de diferentes origens.