import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/dbConfig.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";

dotenv.config();

const app = express();
const PORTA = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());

connectDB();

// Rotas de reservas
app.use("/api/reservas", reservationRoutes);

// Iniciar o servidor
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));
