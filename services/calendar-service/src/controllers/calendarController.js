import fetch from 'node-fetch';

export const getDailyScheduleController = async (req, res) => {
  const { salaId, data } = req.params;

  try {
    // Fazer a requisição ao serviço de reservas
    const response = await fetch(`${process.env.RESERVATION_SERVICE_URL}/get`);
    const reservations = await response.json();

    // Filtrar as reservas pelo ID da sala e data
    const filteredReservations = reservations.filter(reservation => 
      reservation.salaId === parseInt(salaId, 10) && reservation.data === data
    );

    res.status(200).json(filteredReservations);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cronograma diário: ' + error.message });
  }
};