import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize'; // Importando SequelizeModule
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { Reservation } from './models/reservation.model';
import { Room } from './models/room.model';

@Module({
  imports: [
    SequelizeModule.forFeature([Reservation, Room]), // Registrando o modelo 'Reservation' para uso no módulo
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
