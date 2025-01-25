import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, sequelize } from "./src/config/dbConfig.js";
import reservationRoutes from "./src/routes/reservationRoutes.js";

dotenv.config();

const app = express();
const PORTA = process.env.RESERVATION_SERVICE_PORT || 3003;

app.use(cors());
app.use(express.json());

await connectDB();

// Sincroniza modelos com o banco de dados
sequelize.sync({ alter: true })
  .then(() => console.log("Modelos sincronizados com o banco de dados."))
  .catch((error) => console.error("Erro ao sincronizar modelos:", error.message));

// Rotas de reservas
app.use(reservationRoutes);

// Iniciar o servidor
app.listen(PORTA, () => console.log(`Servidor rodando na porta ${PORTA}`));