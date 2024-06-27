import { Travel, AssignmentHistory } from '@prisma/client';
import { CreateAssignmentHistoryDto } from 'src/travel/Application/dtos/create-assigment-history';
import { CreateTravelDto } from 'src/travel/Application/dtos/create-travel.dto';

export interface TravelRepositoryPort {
  createTravel(travel: CreateTravelDto): Promise<Travel>;
  createAssignmentHistory(
    assignmentHistory: CreateAssignmentHistoryDto,
  ): Promise<AssignmentHistory>;
  updateAssignmentHistory( assignmentHistoryId: number,
    assignmentHistory: Partial<CreateAssignmentHistoryDto>,
  ): Promise<AssignmentHistory>;
  updateTravel(travelId: number, status: string): Promise<Travel>;
  listTravels(): Promise<Travel[]>;
 
}
