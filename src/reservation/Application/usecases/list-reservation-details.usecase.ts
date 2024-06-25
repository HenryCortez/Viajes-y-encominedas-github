import { Inject } from '@nestjs/common';
import { ReservationRepositoryPort } from 'src/reservation/Domain/repositories/reservation.repository.port';

export class ListReservationDetailssUsecase {
  constructor(
    @Inject('ReservationRepository')
    private readonly reservationRepository: ReservationRepositoryPort,
  ) {}

  async execute(reservationId: number): Promise<any> {
    const listReservations = this.reservationRepository.listReservationDetails(reservationId);

    return listReservations;
  }
}