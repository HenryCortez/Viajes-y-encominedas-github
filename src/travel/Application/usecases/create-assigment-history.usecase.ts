import { Inject } from '@nestjs/common';
import { TravelRepositoryPort } from 'src/travel/Domain/repositories/travel.repository,port';
import { CreateAssignmentHistoryDto } from '../dtos/create-assigment-history';


export class CreateAssignmentHistoryUsecase {
  constructor(
    @Inject('TravelRepository')
    private readonly travelRepository: TravelRepositoryPort,
  ) {}

  async execute(assignmentHistory: CreateAssignmentHistoryDto): Promise<any> {
    const createdTravel = this.travelRepository.createAssignmentHistory(assignmentHistory);

    return createdTravel;
  }
}