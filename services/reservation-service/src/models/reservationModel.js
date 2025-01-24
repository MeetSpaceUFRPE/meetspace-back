import mongoose from "mongoose";

const { Schema, model } = mongoose;

const reservationSchema = new Schema(
  {
    turno: {
      type: String,
      enum: ["manha", "tarde", "noite"],
      required: true,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    data: {
      type: Date,
      required: true,
    },
    salaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sala",
      required: true,
    },
  },
  {
    timestamps: true, // Campos createdAt e updatedAt automáticos
  }
);

const Reservation = model("Reservation", reservationSchema);

export default Reservation;
