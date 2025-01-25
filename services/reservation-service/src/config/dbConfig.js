import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.POSTGRES_DB, process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT || 5432,
  dialect: "postgres",
  logging: false, // Desabilita logs SQL (opcional)
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o PostgreSQL realizada com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar ao PostgreSQL:", error.message);
    process.exit(1); // Finaliza o processo em caso de erro
  }
};

export { sequelize, connectDB };