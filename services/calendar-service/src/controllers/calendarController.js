import { getDailySchedule } from '../services/calendarService.js';
import { sequelize } from "../config/dbConfig.js";

export const getDailySchedule = async (req, res) => {
  const { salaId, data } = req.params;

  try {
    const schedule = await getDailySchedule(salaId, data);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cronograma diário: ' + error.message });
  }
};