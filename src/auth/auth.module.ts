import { Module } from '@nestjs/common';
import { ApplicationAuthModule } from './Application/application.module';
import { DomainAuthModule } from './Domain/domain.module';
import { InfrastructureAuthModule } from './Infraestructure/infraestructure.module';

@Module({
  imports: [ApplicationAuthModule, DomainAuthModule, InfrastructureAuthModule],
  exports: [],
})
export class AuthModule {}
