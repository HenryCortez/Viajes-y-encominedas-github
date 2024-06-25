import { Module } from '@nestjs/common';
import { CreateEnterpriseUsecase } from './usecases/create-enterprise.usecase';
import { DeleteEnterpriseUsecase } from './usecases/delete-enterprise.usecase';
import { ListEnterprisesUsecase } from './usecases/list-enterprises.usecase';
import { GetEnterpriseByIdUsecase } from './usecases/get-enterprise-by-id.usecase';
import { UpdateEnterpriseUsecase } from './usecases/update-enterprise.usecase';
import { EnterpriseRepositoryAdapter } from '../Infrastructure/repositories/enterprise.repository.adapter';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [CommonModule],
  providers: [
    CreateEnterpriseUsecase,
    DeleteEnterpriseUsecase,
    ListEnterprisesUsecase,
    GetEnterpriseByIdUsecase,
    UpdateEnterpriseUsecase,
    {
      provide: 'EnterpriseRepository',
      useClass: EnterpriseRepositoryAdapter,
    },
  ],
  exports: [
    CreateEnterpriseUsecase,
    DeleteEnterpriseUsecase,
    ListEnterprisesUsecase,
    GetEnterpriseByIdUsecase,
    UpdateEnterpriseUsecase,
    'EnterpriseRepository',
  ],
})
export class EnterpriseApplicationModule {}
