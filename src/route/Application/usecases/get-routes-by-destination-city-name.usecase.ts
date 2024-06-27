import { Inject } from '@nestjs/common';
import { Route } from '@prisma/client';
import { RouteRepositoryPort } from 'src/route/Domain/repositories/route.repository.port';

export class GetRoutesByDestinationCityNameUsecase {
  constructor(
    @Inject('RouteRepository')
    private readonly routeRepository: RouteRepositoryPort,
  ) {}

  async execute(cityName: string): Promise<Route[]> {
    const routes =
      await this.routeRepository.getRoutesByDestinationCityName(cityName);

    return routes;
  }
}
