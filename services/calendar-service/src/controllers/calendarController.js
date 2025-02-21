import { getDailySchedule, getReservationsByPeriod, getReservationFrequency, getAverageOccupancy } from '../services/calendarService.js';

export const getDailyScheduleController = async (req, res) => {
  const { salaId, data } = req.params;

  try {
    const schedule = await getDailySchedule(salaId, data);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cronograma diário: ' + error.message });
  }
};

export const getReservationsByPeriodController = async (req, res) => {
  const { salaId, startDate, endDate } = req.params;

  try {
    const reservations = await getReservationsByPeriod(salaId, startDate, endDate);
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar reservas por período: ' + error.message });
  }
};

export const getReservationFrequencyController = async (req, res) => {
  const { salaId, startDate, endDate } = req.params;

  try {
    const frequency = await getReservationFrequency(salaId, startDate, endDate);
    res.status(200).json({ frequency });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar frequência de reservas: ' + error.message });
  }
};

export const getAverageOccupancyController = async (req, res) => {
  const { salaId, startDate, endDate } = req.params;

  try {
    const averageOccupancy = await getAverageOccupancy(salaId, startDate, endDate);
    res.status(200).json({ averageOccupancy });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ocupação média: ' + error.message });
  }
};