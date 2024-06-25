import { Module } from '@nestjs/common';
import { DomainVehicleModule } from './Domain/domain.module';
import { InfraestructureVehicleModule } from './Infraestructure/infraestructure.module';
import { ApplicationVehicleModule } from './Application/application.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ DomainVehicleModule, InfraestructureVehicleModule, ApplicationVehicleModule],
  exports: [],
})
export class VehicleModule {}
