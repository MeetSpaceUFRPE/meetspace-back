import express from 'express';
import { getReservationFrequencyReport, getAverageOccupancyReport } from '../controllers/reportController.js';

const router = express.Router();

// Rota para obter o relatório de frequência de reservas
router.get('/frequency/:salaId/:startDate/:endDate', getReservationFrequencyReport);

// Rota para obter o relatório de ocupação média
router.get('/occupancy/:salaId/:startDate/:endDate', getAverageOccupancyReport);

export default router;