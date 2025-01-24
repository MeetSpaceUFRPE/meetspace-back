import Reservation from "../models/reservationModel.js";

export const createReservation = async (req, res) => {
  try {
    const { turno, usuarioId, data, salaId } = req.body;
    const newReservation = await Reservation.create({ turno, usuarioId, data, salaId });
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar reserva: " + error.message });
  }
};

export const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("usuarioId", "nome")  // Popula os dados do usuário (ajuste conforme necessário)
      .populate("salaId", "nome");    // Popula os dados da sala (ajuste conforme necessário)
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar reservas: " + error.message });
  }
};

// Adicione mais métodos conforme necessário (update, delete, etc.)
