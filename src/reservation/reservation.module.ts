import { Module } from '@nestjs/common';
import { ReservationInfrastructureModule } from './Infrastructure/infrastructure.module';
import { ReservationDomainModule } from './Domain/domain.module';
import { ReservationApplicationModule } from './Application/application.module';

@Module({
  imports: [ReservationInfrastructureModule, ReservationDomainModule, ReservationApplicationModule]
})
export class ReservationModule {}
