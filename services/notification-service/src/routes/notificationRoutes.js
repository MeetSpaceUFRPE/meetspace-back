import express from 'express';
import { notificarConfirmacao, notificarCancelamento } from '../controllers/notificationController.js';

const router = express.Router();


router.post('/confirmacao/:user_id/:reserva_id', notificarConfirmacao);

router.post('/cancelamento/:user_id/:reserva_id', notificarCancelamento);


export default router;