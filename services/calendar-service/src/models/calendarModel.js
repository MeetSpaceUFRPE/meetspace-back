import { DataTypes } from 'sequelize';
import { sequelize } from '../config/dbConfig.js';

const Calendar = sequelize.define('Calendar', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  salaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  turno: {
    type: DataTypes.ENUM('manha', 'tarde', 'noite'),
    allowNull: false,
  },
}, {
  timestamps: true,
  tableName: 'calendarios',
});

export default Calendar;