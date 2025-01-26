import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/dbConfig.js';
import notificationRoutes from './src/routes/notificationRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.NOTIFICATION_SERVICE_PORT || 3005;

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL conectado com sucesso.');
    sequelize.sync({ alter: true });
  })
  .catch((error) => {
    console.error('Erro ao conectar ao PostgreSQL:', error.message);
    process.exit(1);
  });

// Rotas
app.use(notificationRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Serviço de Notificação rodando na porta ${PORT}`));
