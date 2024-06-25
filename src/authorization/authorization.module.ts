import { Module } from '@nestjs/common';
import { DomainAuthorizationModule } from './Domain/domain.module';
import { InfrastructureAuthorizationModule } from './Infrastructure/infrastructure.module';
import { ApplicationAuthorizationModule } from './Application/application.module';


@Module({
  imports: [
    DomainAuthorizationModule,
    InfrastructureAuthorizationModule,
    ApplicationAuthorizationModule,
  ],
  exports: [ApplicationAuthorizationModule],
})
export class AuthorizationModule {}
