import { Module } from '@nestjs/common';
import { EnterpriseDomainModule } from './Domain/domain.module';
import { EnterpriseApplicationModule } from './Application/application.module';
import { EnterpriseInfrastructureModule } from './Infrastructure/infrastructure.module';

@Module({
  imports: [
    EnterpriseDomainModule,
    EnterpriseApplicationModule,
    EnterpriseInfrastructureModule,
  ],
})
export class EnterpriseModule {}
