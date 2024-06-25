import { Module } from '@nestjs/common';
import { RouteDomainModule } from './Domain/domain.module';
import { RouteApplicationModule } from './Application/application.module';
import { RouteInfrastructureModule } from './Infrastructure/infrastructure.module';

@Module({
  imports: [
    RouteDomainModule,
    RouteApplicationModule,
    RouteInfrastructureModule,
  ],
})
export class RouteModule {}
