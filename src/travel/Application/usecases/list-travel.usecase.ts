import { Inject } from '@nestjs/common';
import { TravelRepositoryPort } from 'src/travel/Domain/repositories/travel.repository,port';

export class ListTravelsUsecase {
  constructor(
    @Inject('TravelRepository')
    private readonly travelRepository: TravelRepositoryPort,
  ) {}

  async execute(): Promise<any> {
    const createdTravel = this.travelRepository.listTravels();

    return createdTravel;
  }
}