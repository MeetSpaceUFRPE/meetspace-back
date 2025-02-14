import express from 'express';
import { getDailyScheduleController } from '../controllers/calendarController.js';

const router = express.Router();

// Rota para obter o cronograma diário de uma sala
router.get('/schedule/:salaId/:data', getDailyScheduleController);

export default router;