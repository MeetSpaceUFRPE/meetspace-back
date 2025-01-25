import express from "express";
import { createReservation, getReservations } from "../controllers/reservationController.js";

const router = express.Router();

// Rota para criar uma nova reserva
router.post("/", createReservation);

// Rota para obter todas as reservas
router.get("/", getReservations);

export default router;
