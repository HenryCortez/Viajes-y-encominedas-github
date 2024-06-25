import { Module } from '@nestjs/common';
import { DriverController } from './controllers/driver.controller';
import { DriverRepositoryAdapter } from './repositories/driver.repository.adapter';
import { CommonModule } from '../../common/common.module';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { DriverApplicationModule } from '../Application/application.module';

@Module({
  imports: [DriverApplicationModule, AuthorizationModule, CommonModule],
  providers: [DriverRepositoryAdapter],
  controllers: [DriverController],
})
export class DriverInfrastructureModule {}
