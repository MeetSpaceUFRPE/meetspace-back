export const getDailySchedule = async (salaId, data) => {
  try {
    const schedule = await Calendar.findAll({
      where: {
        salaId,
        data,
      },
    });
    return schedule;
  } catch (error) {
    throw new Error('Erro ao buscar cronograma diário: ' + error.message);
  }
};