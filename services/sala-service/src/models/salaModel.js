import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const salaSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  capacidade: {
    type: Number,
    required: true,
  },
  localizacao: {
    type: String,
    required: true,
  },
  recursos: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  collection: 'salas' // Define explicitamente o nome da coleção como 'salas'
});

const Sala = model('Sala', salaSchema);

export default Sala;
