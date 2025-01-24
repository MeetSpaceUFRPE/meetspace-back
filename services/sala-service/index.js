import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/config/dbConfig.js';
import salaRoutes from './src/routes/salaRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(cors());
app.use(express.json());

connectDB();

// Definindo as rotas
app.use('/api/salas', salaRoutes);

app.listen(PORT, () => console.log(`Serviço de Salas rodando na porta ${PORT}`));
