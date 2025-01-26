import { Controller, Get, Param, HttpStatus } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { HttpException } from '@nestjs/common';

@Controller('salas')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) {}

    // Endpoint para verificar a disponibilidade de uma sala dado um turno e data
    @Get(':id/disponibilidade/:turno/:data')
    async checkAvailability(
        @Param('id') id: Number,
        @Param('turno') turno: 'manha' | 'tarde' | 'noite',
        @Param('data') data: string,
    ): Promise<{ available: boolean }> {
        try {
            const available = await this.reservationService.isAvailable(id, turno, data);
            return { available };
        } catch (error){
            // Verifica se o erro veio do service
            if (error instanceof HttpException) {
                throw new HttpException(error.message, error.getStatus());
            }

            // Caso contrário, lança um erro genérico
            throw new HttpException(
                'Erro ao verificar a disponibilidade da sala.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}