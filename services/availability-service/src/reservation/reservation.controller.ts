import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { HttpException } from '@nestjs/common';

@Controller('salas')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    // Endpoint para verificar a disponibilidade de uma sala dado um turno
    @Get(':id/disponibilidade/:turno')
    async checkAvailability(
        @Param('id') id: string,
        @Param('turno') turno: 'manha' | 'tarde' | 'noite',
    ): Promise<{ available: boolean }> {
        try {
            const available = await this.reservationService.isAvailable(id, turno);
            return { available };
        } catch (error){
            throw new HttpException(
                'Erro ao verificar a disponibilidade da sala',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

}