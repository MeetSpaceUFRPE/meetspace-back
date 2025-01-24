import express from 'express';
import { createSala, getSalas, updateSala } from '../controllers/salaController.js';

const router = express.Router();

// Criar uma sala
router.post('/', createSala);

// Listar salas
router.get('/', getSalas);

// Atualizar uma sala
router.put('/:salaId', updateSala);

export default router;
