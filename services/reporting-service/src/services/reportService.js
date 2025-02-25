import fetch from 'node-fetch';

const CALENDAR_SERVICE_URL = process.env.CALENDAR_SERVICE_URL || 'http://calendar-service:3007';

export const getReservationFrequency = async (salaId, startDate, endDate) => {
  try {
    const response = await fetch(`${CALENDAR_SERVICE_URL}/api/calendar/frequency/${salaId}/${startDate}/${endDate}`);
    const data = await response.json();
    return data.frequency;
  } catch (error) {
    throw new Error('Erro ao buscar frequência de reservas: ' + error.message);
  }
};

export const getAverageOccupancy = async (salaId, startDate, endDate) => {
  try {
    const response = await fetch(`${CALENDAR_SERVICE_URL}/api/calendar/occupancy/${salaId}/${startDate}/${endDate}`);
    const data = await response.json();
    return data.averageOccupancy;
  } catch (error) {
    throw new Error('Erro ao buscar ocupação média: ' + error.message);
  }
};