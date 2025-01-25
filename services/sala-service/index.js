import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './src/config/dbConfig.js';
import salaRoutes from './src/routes/salaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL conectado com sucesso.');
    sequelize.sync({ alter: true }); // Sincroniza os modelos com o banco de dados
  })
  .catch((error) => {
    console.error('Erro ao conectar ao PostgreSQL:', error.message);
    process.exit(1);
  });

// Rotas
app.use('/api/salas', salaRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Serviço de Salas rodando na porta ${PORT}`));
