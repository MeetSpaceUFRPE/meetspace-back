import express from "express";
import { createReservation, getReservations, getUserReservations } from "../controllers/reservationController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Rota para criar uma nova reserva
router.post("/create", authMiddleware, createReservation);

// Rota para obter todas as reservas
router.get("/get", getReservations);

// Rota para obter as reservas de um usuário
router.get("/user", authMiddleware, getUserReservations);

export default router;
