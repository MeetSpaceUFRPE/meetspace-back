import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ReservationService {
  constructor() {}

  // Método para verificar se um turno está ocupado
  async isAvailable(id: Number, turno: 'manha' | 'tarde' | 'noite', data: string): Promise<boolean> {
    // Chama o endpoint do serviço de reservas obtendo todas as reservas
    const reservas = await fetch('http://reservation-service:3003/get');
    const reservasJson = await reservas.json();
    
    // Filtra as reservas para obter as reservas da sala no turno e data especificados
    const reservasDaSalaNoTurno = reservasJson.filter((reserva: ReservationType) => {
      return Number(reserva.salaId) === Number(id) && String(reserva.turno) === String(turno)
          && String(reserva.data) === String(data);
    });

    // Se não houver nenhuma reserva, a sala está disponível
    return reservasDaSalaNoTurno.length === 0;
  }
}

type ReservationType = {
  id: Number;
  turno: 'manha' | 'tarde' | 'noite';
  usuarioId: Number;
  data: Date; // formato 'YYYY-MM-DD'
  salaId: Number;
  createdAt: Date; // formato 'YYYY-MM-DD HH:mm:ss'
  updatedAt: Date; // formato 'YYYY-MM-DD HH:mm:ss'
};
