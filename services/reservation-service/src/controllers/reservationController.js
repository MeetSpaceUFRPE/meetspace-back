import Reservation from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
  try {
    const { turno, usuarioId, data, salaId } = req.body;
    const newReservation = await Reservation.create({ turno, usuarioId, data, salaId });

    await fetch(`http://notification-service:3005/confirmacao/${usuarioId}/${newReservation.id}`, {
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