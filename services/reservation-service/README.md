## Variáveis de Ambiente

```bash
POSTGRES_DB=postgres
POSTGRES_USER=postgres 
POSTGRES_PASSWORD=postgres
POSTGRES_HOST=db
POSTGRES_PORT=5432
RESERVATION_SERVICE_PORT=3003
```

```
reservation-service/
├── src/
│   ├── controllers/       # Controladores para a lógica das rotas
│   │   └── reservationController.js
│   ├── models/            # Modelos para o banco de dados
│   │   └── reservationModel.js
│   ├── routes/            # Definições das rotas
│   │   └── reservationRoutes.js
│   ├── services/          # Lógica de negócios
│   │   └── reservationService.js
│   ├── utils/             # Funções utilitárias
│   │   └── dateUtils.js
│   ├── config/            # Configurações
│   │   └── dbConfig.js
│   └── index.js           # Ponto de entrada da aplicação
├── .env                   # Variáveis de ambiente
├── package.json           # Dependências e scripts
└── README.md              # Documentação
```
