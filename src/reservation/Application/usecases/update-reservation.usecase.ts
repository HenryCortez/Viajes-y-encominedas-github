import { Inject } from '@nestjs/common';
import { ReservationRepositoryPort } from 'src/reservation/Domain/repositories/reservation.repository.port';
import { CreateReservationDto } from '../dtos/create-reservation.dto';

export class UpdateReservationUsecase {
  constructor(
    @Inject('ReservationRepository')
    private readonly reservationRepository: ReservationRepositoryPort,
  ) {}

  async execute(reservationId: number, reservation: Partial<CreateReservationDto>): Promise<any> {
    const updatedReservation = this.reservationRepository.updateReservation(reservationId, reservation);

    return updatedReservation;
  }
}