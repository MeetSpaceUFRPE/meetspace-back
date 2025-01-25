import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('salas')
export class ReservationController {
    constructor(private readonly reservationService: ReservationService) { }

    // Endpoint para verificar a disponibilidade de uma sala dado um turno
    @Get(':id/disponibilidade/:turno')
    async checkAvailability(
        @Param('id') id: string,
        @Param('turno') turno: 'manha' | 'tarde' | 'noite',
    ): Promise<{ available: boolean }> {
        const available = await this.reservationService.isAvailable(id, turno);
        return { available };
    }

}