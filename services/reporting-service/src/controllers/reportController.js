import { getReservationFrequency, getAverageOccupancy } from '../services/reportService.js';

export const getReservationFrequencyReport = async (req, res) => {
  const { salaId, startDate, endDate } = req.params;

  try {
    const frequency = await getReservationFrequency(salaId, startDate, endDate);
    res.status(200).json({ frequency });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de frequência de reservas: ' + error.message });
  }
};

export const getAverageOccupancyReport = async (req, res) => {
  const { salaId, startDate, endDate } = req.params;

  try {
    const averageOccupancy = await getAverageOccupancy(salaId, startDate, endDate);
    res.status(200).json({ averageOccupancy });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao gerar relatório de ocupação média: ' + error.message });
  }
};