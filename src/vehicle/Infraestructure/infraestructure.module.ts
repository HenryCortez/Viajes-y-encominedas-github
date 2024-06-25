import {Module} from '@nestjs/common';
import { ApplicationVehicleModule } from '../Application/application.module';
import {VehicleController} from './controllers/vehicle.controller';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { VehicleTypeController } from './controllers/vehicleType.controller';





@Module({
    imports: [ApplicationVehicleModule ],
    controllers: [VehicleController, VehicleTypeController],
    })
export class InfraestructureVehicleModule {}
