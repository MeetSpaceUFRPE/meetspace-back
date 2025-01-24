import Sala from '../models/salaModel.js';

// Criar uma nova sala
export const createSala = async (req, res) => {
  try {
    const { nome, capacidade, localizacao, recursos } = req.body;
    const newSala = new Sala({ nome, capacidade, localizacao, recursos });
    await newSala.save();
    res.status(201).json(newSala);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar sala: " + error.message });
  }
};

// Listar todas as salas
export const getSalas = async (req, res) => {
  try {
    const salas = await Sala.find();
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar salas: " + error.message });
  }
};

// Atualizar informações de uma sala
export const updateSala = async (req, res) => {
  try {
    const { salaId } = req.params;
    const updatedSala = await Sala.findByIdAndUpdate(salaId, req.body, { new: true });
    if (!updatedSala) {
      return res.status(404).json({ error: "Sala não encontrada!" });
    }
    res.status(200).json(updatedSala);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar sala: " + error.message });
  }
};
