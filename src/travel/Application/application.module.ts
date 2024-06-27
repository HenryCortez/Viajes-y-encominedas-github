import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { CreateAssignmentHistoryUsecase } from './usecases/create-assigment-history.usecase';
import { CreateTravelUsecase } from './usecases/create-travel.usecase';
import { ListTravelsUsecase } from './usecases/list-travel.usecase';
import { UpdateAssignmentHistoryUsecase } from './usecases/update-assigment-history.usecase';
import { TravelRepositoryAdapter } from '../Infrastructure/repositories/travel.repository.adapter';
import { UpdateTravelUsecase } from './usecases/update-travel.usecase';

@Module({
    imports: [CommonModule],
    providers: [
        CreateAssignmentHistoryUsecase,
        CreateTravelUsecase,
        ListTravelsUsecase,
        UpdateAssignmentHistoryUsecase,
        UpdateTravelUsecase,
        {
            provide: 'TravelRepository',
            useClass: TravelRepositoryAdapter,
        }
    ],
    exports: [
        CreateAssignmentHistoryUsecase,
        CreateTravelUsecase,
        ListTravelsUsecase,
        UpdateAssignmentHistoryUsecase,
        'TravelRepository',
        UpdateTravelUsecase
    ],
})
export class TravelApplicationModule {}
