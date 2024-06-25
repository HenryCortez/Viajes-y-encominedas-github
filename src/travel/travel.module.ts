import { Module } from '@nestjs/common';
import { TravelDomainModule } from './Domain/domain.module';
import { TravelApplicationModule } from './Application/application.module';
import { TravelInfrastructureModule } from './Infrastructure/infrastructure.module';

@Module({
  imports: [TravelDomainModule, TravelApplicationModule, TravelInfrastructureModule]
})
export class TravelModule {}
