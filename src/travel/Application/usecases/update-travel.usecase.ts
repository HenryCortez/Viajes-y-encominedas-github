import { Inject } from '@nestjs/common';
import { TravelRepositoryPort } from 'src/travel/Domain/repositories/travel.repository,port';
import { CreateAssignmentHistoryDto } from '../dtos/create-assigment-history';
import { CreateTravelDto } from '../dtos/create-travel.dto';


export class UpdateTravelUsecase{
  constructor(
    @Inject('TravelRepository')
    private readonly travelRepository: TravelRepositoryPort,
  ) {}

  async execute(travelId : number, status:string): Promise<any> {
    const createdTravel = this.travelRepository.updateTravel(travelId, status);

    return createdTravel;
  }
}