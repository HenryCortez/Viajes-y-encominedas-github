import { Inject } from '@nestjs/common';
import { RouteRepositoryPort } from '../../Domain/repositories/route.repository.port';
import { CreateRouteDto } from '../dtos/create-route.dto';

export class CreateRouteUsecase {
  constructor(
    @Inject('RouteRepository')
    private readonly routeRepository: RouteRepositoryPort,
  ) {}

  async execute(route: CreateRouteDto) {
    const createdRoute = await this.routeRepository.createRoute({
      origin_city_id: route.origin_city_id,
      destination_city_id: route.destination_city_id,
    });

    return createdRoute;
  }
}
