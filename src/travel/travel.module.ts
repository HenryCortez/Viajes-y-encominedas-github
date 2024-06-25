import { Module } from '@nestjs/common';
import { TravelDomainModule } from './domain/domain.module';
import { TravelApplicationModule } from './application/application.module';
import { TravelInfrastructureModule } from './infrastructure/infrastructure.module';

@Module({
  imports: [TravelDomainModule, TravelApplicationModule, TravelInfrastructureModule]
})
export class TravelModule {}
