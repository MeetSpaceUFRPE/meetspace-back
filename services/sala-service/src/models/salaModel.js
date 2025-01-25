import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig.js';

const Sala = sequelize.define('Sala', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recursos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
}, {
  timestamps: true,
  tableName: 'salas',
});
export default Sala;
