import {Module} from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import * as Usecases from './usecases/index';
import { PrismaVehicleRepositoryAdapter } from '../Infraestructure/repositories/prisma.vehicle.repository.adapter';

@Module({
    imports: [CommonModule],
    providers: [
        ...Object.values(Usecases),
        {
        provide: 'VehicleRepository',
        useClass: PrismaVehicleRepositoryAdapter,
        },
    ],
    exports: [
        ...Object.values(Usecases),
        'VehicleRepository',
    ],
    })
export class ApplicationVehicleModule {}