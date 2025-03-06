import express from 'express';
import { getDailyScheduleController, getReservationsByPeriodController, getReservationFrequencyController, getAverageOccupancyController } from '../controllers/calendarController.js';

const router = express.Router();

// Rota para obter o cronograma diário de uma sala
router.get('/schedule/:salaId/:data', getDailyScheduleController);

// Rota para obter reservas por período
router.get('/reservations/:salaId/:startDate/:endDate', getReservationsByPeriodController);

// Rota para obter a frequência de reservas
router.get('/frequency/:salaId/:startDate/:endDate', getReservationFrequencyController);

// Rota para obter a ocupação média
router.get('/occupancy/:salaId/:startDate/:endDate', getAverageOccupancyController);

export default router;