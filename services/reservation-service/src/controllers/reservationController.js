import Reservation from "../models/reservationModel.js";
import dotenv from 'dotenv';

dotenv.config();

export const createReservation = async (req, res) => {
  try {
    const { turno, data, salaId } = req.body;
    // Chama o serviço de salas para verificar se a sala existe
    const salas = await (await fetch(`${process.env.SALA_SERVICE_URL}/get`)).json();
    if (!salas.find((sala) => sala.id === salaId)) {
      return res.status(400).json({ error: "Sala não encontrada" });
    }

    // Chama o serviço de disponibilidade para verificar se a sala está disponível
    const disponibilidade = await (await fetch(`${process.env.AVAILABILITY_SERVICE_URL}/salas/${salaId}/disponibilidade/${turno}/${data}`)).json();
    
    if (!disponibilidade.available) {
      return res.status(400).json({ error: "Sala não está disponível" });
    }

    // O id do usuário é obtido do token JWT que foi validado pelo middleware de autenticação
    const usuarioId = req.user.id;
    const newReservation = await Reservation.create({ turno, usuarioId, data, salaId });
    
    // Envia e-mail de confirmação
    await fetch(`${process.env.NOTIFICATION_SERVICE_URL}/confirmacao/${usuarioId}/${newReservation.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    res.status(201).json(newReservation);

  } catch (error) {
    res.status(500).json({ error: "Erro ao criar reserva: " + error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar reservas: " + error.message });
  }
};

export const getUserReservations = async (req, res) => {
  try {
    const usuarioId = req.user.id;
    const reservations = await Reservation.findAll({ where: { usuarioId } });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar reservas: " + error.message });
  }
};

export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.user.id;
    const reservation = await Reservation.findOne({ where: { id, usuarioId } });

    if (!reservation) {
      return res.status(404).json({ error: "Reserva não encontrada" });
    }

    // Envia e-mail de cancelamento
    const notification = await fetch(`${process.env.NOTIFICATION_SERVICE_URL}/cancelamento/${usuarioId}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })

    // Deleta a reserva
    await Reservation.destroy({ where: { id } });

    res.status(200).json({ message: "Reserva cancelada com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cancelar reserva: " + error.message });
  }
};