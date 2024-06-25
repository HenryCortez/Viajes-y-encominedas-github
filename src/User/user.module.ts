import { Module } from '@nestjs/common';
import { ApplicationUserModule } from './Application/application.module';
import { DomainUserModule } from './Domain/domain.module';
import { InfrastructureUserModule } from './Infrastructure/infrastructure.module';

@Module({
  imports: [ApplicationUserModule, DomainUserModule, InfrastructureUserModule],

  exports: [ApplicationUserModule],
})
export class UserModule {}
