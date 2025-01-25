import express from 'express';
import { createSala, getSalas, updateSala, deleteSala } from '../controllers/salaController.js';

const router = express.Router();

// Criar uma sala
router.post('/', createSala);

// Listar salas
router.get('/', getSalas);

// Atualizar uma sala
router.put('/:salaId', updateSala);

// Deletar uma sala
router.delete('/:salaId', deleteSala);

export default router;