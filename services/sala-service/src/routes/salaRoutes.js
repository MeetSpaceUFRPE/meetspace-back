import express from 'express';
import { createSala, getSalas, updateSala, deleteSala } from '../controllers/salaController.js';

const router = express.Router();

// Criar uma sala
router.post('/create', createSala);

// Listar salas
router.get('/get', getSalas);

// Atualizar uma sala
router.put('/update/:salaId', updateSala);

// Deletar uma sala
router.delete('/delete/:salaId', deleteSala);

export default router;