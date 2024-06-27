import { Module } from '@nestjs/common';
import { ApplicationVehicleModule } from '../Application/application.module';
import { VehicleController } from './controllers/vehicle.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { VehicleTypeController } from './controllers/vehicleType.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [ApplicationVehicleModule, AuthorizationModule, CommonModule],
  controllers: [VehicleController, VehicleTypeController],
})
export class InfraestructureVehicleModule {}
