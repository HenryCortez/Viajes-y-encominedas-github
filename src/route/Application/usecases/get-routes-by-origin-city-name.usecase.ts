import { Inject } from '@nestjs/common';
import { Route } from '@prisma/client';
import { RouteRepositoryPort } from '../../Domain/repositories/route.repository.port';

export class GetRoutesByOriginCityNameUsecase {
  constructor(
    @Inject('RouteRepository')
    private readonly routeRepository: RouteRepositoryPort,
  ) {}

  async execute(cityName: string): Promise<Route[]> {
    const routes =
      await this.routeRepository.getRoutesByOriginCityName(cityName);

    return routes;
  }
}
