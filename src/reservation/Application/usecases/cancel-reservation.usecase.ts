import { Inject } from '@nestjs/common';
import { ReservationRepositoryPort } from '../../Domain/repositories/reservation.repository.port';

export class CancelReservationUsecase {
  constructor(
    @Inject('ReservationRepository')
    private readonly reservationRepository: ReservationRepositoryPort,
  ) {}

  async execute(reservationId : number): Promise<any> {
    const canceledReservation = this.reservationRepository.cancelReservation(reservationId);

    return canceledReservation;
  }
}