import { DataTypes } from "sequelize";
import { sequelize } from "../config/dbConfig.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    turno: {
      type: DataTypes.ENUM("manha", "tarde", "noite"),
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
    salaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "reservas",
    timestamps: true, // Cria createdAt e updatedAt
  }
);

export default Reservation;