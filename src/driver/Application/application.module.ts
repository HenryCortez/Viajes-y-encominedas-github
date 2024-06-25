import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { CreateDriverUsecase } from './usecases/create-driver.useacase';
import { DeleteDriverUsecase } from './usecases/delete-driver.usecase';
import { UpdateDriverUsecase } from './usecases/update-driver.usecase';
import { ListDriversUsecase } from './usecases/list-drivers.usecase';
import { DriverRepositoryAdapter } from '../Infrastructure/repositories/driver.repository.adapter';

@Module({
  imports: [CommonModule],
  providers: [
    CreateDriverUsecase,
    DeleteDriverUsecase,
    UpdateDriverUsecase,
    ListDriversUsecase,
    {
      provide: 'DriverRepository',
      useClass: DriverRepositoryAdapter,
    },
  ],
  exports: [
    CreateDriverUsecase,
    DeleteDriverUsecase,
    UpdateDriverUsecase,
    ListDriversUsecase,
    'DriverRepository',
  ],
})
export class DriverApplicationModule {}
