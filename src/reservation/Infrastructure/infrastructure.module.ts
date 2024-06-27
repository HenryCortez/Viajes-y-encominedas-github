import { Module } from '@nestjs/common';
import { ReservationApplicationModule } from '../Application/application.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { CommonModule } from 'src/common/common.module';
import { ReservationRepositoryAdapter } from './repositories/reservation.repository.adapter';
import { ReservationController } from './controllers/reservation.controller';

@Module({
    imports: [ReservationApplicationModule, AuthorizationModule, CommonModule],
  providers: [ReservationRepositoryAdapter],
  controllers: [ReservationController],
})
export class ReservationInfrastructureModule {}
