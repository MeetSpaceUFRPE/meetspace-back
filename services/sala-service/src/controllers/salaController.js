import Sala from '../models/salaModel.js';

// Criar uma nova sala
export const createSala = async (req, res) => {
  try {
    const { nome, capacidade, localizacao, recursos } = req.body;
    const newSala = await Sala.create({ nome, capacidade, localizacao, recursos });
    res.status(201).json(newSala);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar sala: ' + error.message });
  }
};

// Listar todas as salas
export const getSalas = async (req, res) => {
  try {
    const salas = await Sala.findAll();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar salas: ' + error.message });
  }
};

// Atualizar informações de uma sala
export const updateSala = async (req, res) => {
  try {
    const { salaId } = req.params;
    const updatedSala = await Sala.update(req.body, { where: { id: parseInt(salaId, 10) }, returning: true });
    if (!updatedSala[0]) {
      return res.status(404).json({ error: 'Sala não encontrada!' });
    }
    res.status(200).json(updatedSala[1][0]);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar sala: ' + error.message });
  }
};

// Deletar uma sala
export const deleteSala = async (req, res) => {
  try {
    const { salaId } = req.params;
    const deleted = await Sala.destroy({ where: { id: parseInt(salaId, 10) } });
    if (!deleted) {
      return res.status(404).json({ error: 'Sala não encontrada!' });
    }
    res.status(200).json({ message: 'Sala deletada com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar sala: ' + error.message });
  }
};
