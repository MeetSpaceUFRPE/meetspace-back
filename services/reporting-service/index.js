import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import reportRoutes from './src/routes/reportRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.REPORTING_SERVICE_PORT || 3008;

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/reports', reportRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Serviço de Relatórios rodando na porta ${PORT}`));