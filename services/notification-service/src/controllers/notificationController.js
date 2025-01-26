import nodemailer from 'nodemailer';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

export const notificarCancelamento = async (req, res) => {
  try {
    const { user_id, reserva_id } = req.params;

    const data = await getData(user_id, reserva_id);
    const response = await sendEmail(data.email, data.reserva, "cancelamento", data.sala);

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar notificação: ' + error.message });
  }
};

export const notificarConfirmacao = async (req, res) => {
  try {
    const { user_id, reserva_id } = req.params;

    const data = await getData(user_id, reserva_id);
    const response = await sendEmail(data.email, data.reserva, "confirmacao", data.sala);
    
    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar notificação: ' + error.message });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email, reserva, assunto, sala) => {
  const emailBody = (assunto === "confirmacao")
  ? `
    <p>Confirmação de Reserva</p>
    <p>A sua reserva foi <b>CONFIRMADA</b> com sucesso. Confira abaixo mais informações: </p>
    <ul>
    <li>Nome da sala: ${sala.nome}</li>
    <li>Localização: ${sala.localizacao}º andar</li>
    <li>Turno: ${reserva.turno}</li>
    <li>Data: ${reserva.data}</li>
    </ul>
    `
    : `
    <p>Confirmação de Cancelamento</p>
    <p>A sua reserva da ${sala.nome} no dia ${reserva.data} (${reserva.turno}) foi <b>CANCELADA</b> com sucesso.</p>
    `;
    
    try {
      return await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmação de ${assunto === "cancelamento" ? "Cancelamento" : "Reserva"}`,
      text: `${(assunto === "cancelamento") 
        ? `A sua reserva da sala "${sala.nome}" no dia ${reserva.data} (${reserva.turno}) foi CANCELADA com sucesso.`
        : `A sua reserva foi CONFIRMADA com sucesso. Confira abaixo mais informações:\n
        - Nome da sala: ${sala.nome}\n
        - Localização: ${sala.localizacao}º andar\n
        - Turno: ${reserva.turno}\n
        - Data: ${reserva.data}`}`,    
      html: emailBody,
    });
  } catch (err) {
    throw new Error("Erro ao enviar e-mail de confirmação: " + err.message);
  }
};

const getData = async (user_id, reserva_id) => {
  try {

    // Requisições aos serviços
    const reservas = await fetch(`${process.env.RESERVATION_SERVICE_URL}/get`);
    const reservasJson = await reservas.json();

    const user = await fetch(`${process.env.USER_SERVICE_URL}/users/${user_id}`);
    const userJson = await user.json();

    const salas = await fetch(`${process.env.SALA_SERVICE_URL}/get`);
    const salasJson = await salas.json();

    const reserva = reservasJson.find(
      (reservation) =>
        reservation.usuarioId === Number(userJson.id) &&
        reservation.id === Number(reserva_id)
    );

    if (!reserva) throw new Error('Reserva não encontrada.');

    const sala = salasJson.find((sala) => sala.id === Number(reserva.salaId));
    if (!sala) throw new Error('Sala não encontrada.');

    return { email: userJson.email, reserva, sala };
  } catch (error) {
    console.error('Erro ao obter dados:', error.message);
    throw new Error(error.message);
  }
};
