import { Module } from '@nestjs/common';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { CommonModule } from '../../common/common.module';
import { CreateRouteUsecase } from './usecases/create-route.usecase';
import { CreateRouteDetailUsecase } from './usecases/create-route-detail.usecase';
import { GetRoutesByOriginCityNameUsecase } from './usecases/get-routes-by-origin-city-name.usecase';
import { GetRoutesByDestinationCityNameUsecase } from './usecases/get-routes-by-destination-city-name.usecase';
import { RouteRepostoryAdapter } from '../Infrastructure/repositories/route.repository.adapter';

@Module({
  imports: [CommonModule, AuthorizationModule],
  providers: [
    CreateRouteUsecase,
    CreateRouteDetailUsecase,
    GetRoutesByOriginCityNameUsecase,
    GetRoutesByDestinationCityNameUsecase,
    {
      provide: 'RouteRepository',
      useClass: RouteRepostoryAdapter,
    },
  ],
  exports: [
    CreateRouteUsecase,
    CreateRouteDetailUsecase,
    GetRoutesByOriginCityNameUsecase,
    GetRoutesByDestinationCityNameUsecase,
    'RouteRepository',
  ],
})
export class RouteApplicationModule {}
