import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import calendarRoutes from './src/routes/calendarRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.CALENDAR_SERVICE_PORT || 3007;

app.use(cors());
app.use(express.json());

// Rotas
app.use(calendarRoutes);

// Iniciar servidor
app.listen(PORT, () => console.log(`Serviço de Calendário rodando na porta ${PORT}`));