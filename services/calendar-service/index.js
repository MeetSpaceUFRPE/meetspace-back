import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './src/config/dbConfig.js';
import calendarRoutes from './src/routes/calendarRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.CALENDAR_SERVICE_PORT || 3007;

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
app.use('/api/calendar', calendarRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Serviço de Calendário rodando na porta ${PORT}`));