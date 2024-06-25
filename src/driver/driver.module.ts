import { Module } from '@nestjs/common';
import { DriverDomainModule } from './Domain/domain.module';
import { DriverApplicationModule } from './Application/application.module';
import { DriverInfrastructureModule } from './Infrastructure/infrastructure.module';

@Module({
  imports: [
    DriverDomainModule,
    DriverApplicationModule,
    DriverInfrastructureModule,
  ],
})
export class DriverModule {}
