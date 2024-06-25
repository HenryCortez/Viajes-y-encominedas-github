import { Inject } from '@nestjs/common';
import { TravelRepositoryPort } from 'src/travel/Domain/repositories/travel.repository,port';
import { CreateAssignmentHistoryDto } from '../dtos/create-assigment-history';


export class UpdateAssignmentHistoryUsecase{
  constructor(
    @Inject('TravelRepository')
    private readonly travelRepository: TravelRepositoryPort,
  ) {}

  async execute(travelId : number, assignmentHistory: Partial<CreateAssignmentHistoryDto>): Promise<any> {
    const createdTravel = this.travelRepository.updateAssignmentHistory(travelId, assignmentHistory);

    return createdTravel;
  }
}