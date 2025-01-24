import mongoose from "mongoose";

// Função para conectar ao banco de dados MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexão com o MongoDB realizada com sucesso.");
  } catch (erro) {
    console.error("Erro ao conectar ao MongoDB:", erro.message);
    process.exit(1); // Finaliza o processo em caso de erro
  }
};

export default connectDB;
