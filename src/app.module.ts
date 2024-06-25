import { Module } from '@nestjs/common';
import { UserModule } from "./User/user.module";
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { EnterpriseModule } from './enterprise/enterprise.module';
import { DriverModule } from './driver/driver.module';
import { ConfigModule } from '@nestjs/config';
import { RequestModule } from './request/request.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RouteModule } from './route/route.module';
import { TravelModule } from './travel/travel.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  imports: [
    UserModule,
    CommonModule,
    AuthModule,
    AuthorizationModule,
    VehicleModule,
    EnterpriseModule,
    DriverModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RequestModule,
    EventEmitterModule.forRoot(),
    RouteModule,
    TravelModule,
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
