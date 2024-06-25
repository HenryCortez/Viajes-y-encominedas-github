import { Module } from '@nestjs/common';
import { CreateRequestUsecase } from './usecases/create-request.usecase';
import { GetRequestsByEntrerpriseIdUsecase } from './usecases/get-requests-by-enterprise-id.usecase';
import { UpdateRequestUsecase } from './usecases/update-request.usecase';
import { CommonModule } from 'src/common/common.module';
import { RequestRepositoryAdapter } from '../Infrastructure/repositories/request.repository.adapter';

@Module({
  imports: [CommonModule],
  providers: [
    CreateRequestUsecase,
    GetRequestsByEntrerpriseIdUsecase,
    UpdateRequestUsecase,
    {
      provide: 'RequestRepository',
      useClass: RequestRepositoryAdapter,
    },
  ],
  exports: [
    CreateRequestUsecase,
    GetRequestsByEntrerpriseIdUsecase,
    UpdateRequestUsecase,
    'RequestRepository',
  ],
})
export class RequestApplicationModule {}
