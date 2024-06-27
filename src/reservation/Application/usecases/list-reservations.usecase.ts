import { Inject } from '@nestjs/common';
import { ReservationRepositoryPort } from 'src/reservation/Domain/repositories/reservation.repository.port';

export class ListReservationsUsecase {
  constructor(
    @Inject('ReservationRepository')
    private readonly reservationRepository: ReservationRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const listReservations = this.reservationRepository.listReservations();

    return listReservations;
  }
}