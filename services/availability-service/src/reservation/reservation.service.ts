import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './models/reservation.model';
import { Room } from './models/room.model';
import { Op } from 'sequelize';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation)
    private readonly reservationModel: typeof Reservation, // Injeta o modelo Reservation
    @InjectModel(Room)
    private readonly roomModel: typeof Room, // Injeta o modelo Room
  ) {}

  // Método para verificar se um turno está ocupado
  async isAvailable(id: string, turno: 'manha' | 'tarde' | 'noite'): Promise<boolean> {
    // Verifica se a sala existe
    const sala = await this.roomModel.findOne({
      where: {
        id: id,
      },
    });

    if (!sala) {
      throw new Error('Sala não existe.');
    }

    // Busca a reserva para a sala e turno específicos
    const reservation = await this.reservationModel.findOne({
      where: {
        salaId: id,
        turno: turno,
        data: {
          [Op.gte]: new Date(), // Verifica se a data da reserva é maior ou igual à data atual
        },
      },
    });

    // Se não há reservas com o respectivo id e turno, a sala está disponível
    if (!reservation) {
      return true;
    }

    // Se há uma reserva válida para o turno, o turno está ocupado
    return false;
  }
}
