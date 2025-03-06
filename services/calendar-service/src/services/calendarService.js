import fetch from 'node-fetch';

const fetchReservations = async () => {
  const response = await fetch(`${process.env.RESERVATION_SERVICE_URL}/get`);
  return response.json();
};

export const getDailySchedule = async (salaId, data) => {
  try {
    const reservations = await fetchReservations();
    return reservations.filter(reservation => 
      reservation.salaId === parseInt(salaId, 10) && reservation.data === data
    );
  } catch (error) {
    throw new Error('Erro ao buscar cronograma diário: ' + error.message);
  }
};

export const getReservationsByPeriod = async (salaId, startDate, endDate) => {
  try {
    const reservations = await fetchReservations();
    return reservations.filter(reservation => 
      reservation.salaId === parseInt(salaId, 10) && reservation.data >= startDate && reservation.data <= endDate
    );
  } catch (error) {
    throw new Error('Erro ao buscar reservas por período: ' + error.message);
  }
};

export const getReservationFrequency = async (salaId, startDate, endDate) => {
  try {
    const reservations = await getReservationsByPeriod(salaId, startDate, endDate);
    return reservations.length;
  } catch (error) {
    throw new Error('Erro ao buscar frequência de reservas: ' + error.message);
  }
};

export const getAverageOccupancy = async (salaId, startDate, endDate) => {
  try {
    const reservations = await getReservationsByPeriod(salaId, startDate, endDate);
    const totalReservations = reservations.length;
    const totalDays = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;
    return totalReservations / totalDays;
  } catch (error) {
    throw new Error('Erro ao buscar ocupação média: ' + error.message);
  }
};