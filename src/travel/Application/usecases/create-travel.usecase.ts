import { Inject } from '@nestjs/common';
import { TravelRepositoryPort } from 'src/travel/Domain/repositories/travel.repository,port';
import { CreateTravelDto } from '../dtos/create-travel.dto';

export class CreateTravelUsecase {
  constructor(
    @Inject('TravelRepository')
    private readonly travelRepository: TravelRepositoryPort,
  ) {}

  async execute(travel: CreateTravelDto): Promise<any> {
    const createdTravel = this.travelRepository.createTravel(travel);

    return createdTravel;
  }
}
