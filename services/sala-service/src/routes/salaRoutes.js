import express from 'express';
import { createSala, getSalas, updateSala, deleteSala } from '../controllers/salaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Criar uma sala
router.post('/create', authMiddleware, createSala);

// Listar salas
router.get('/get', getSalas);

// Atualizar uma sala
router.put('/update/:salaId', authMiddleware, updateSala);

// Deletar uma sala
router.delete('/delete/:salaId', authMiddleware, deleteSala);

export default router;