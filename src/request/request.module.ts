import { Module } from '@nestjs/common';
import { RequestDomainModule } from './Domain/domain.module';
import { RequestApplicationModule } from './Application/application.module';
import { RequestInfrastructureModule } from './Infrastructure/infrastructure.module';

@Module({
  imports: [
    RequestDomainModule,
    RequestApplicationModule,
    RequestInfrastructureModule,
  ],
})
export class RequestModule {}
