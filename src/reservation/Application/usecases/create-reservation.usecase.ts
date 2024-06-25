import { Inject } from '@nestjs/common';
import { ReservationRepositoryPort } from 'src/reservation/Domain/repositories/reservation.repository.port';
import { CreateReservationDto } from '../dtos/create-reservation.dto';


export class CreateReservationUsecase {
  constructor(
    @Inject('ReservationRepository')
    private readonly reservationRepository: ReservationRepositoryPort,
  ) {}

  async execute(createReservation : CreateReservationDto): Promise<any> {
    const createdReservation = this.reservationRepository.createReservation(createReservation);

    return createdReservation;
  }
}