import { Inject } from '@nestjs/common';
import { RouteRepositoryPort } from '../../Domain/repositories/route.repository.port';
import { CreateRouteDetailDto } from '../dtos/create-route-detail.dto';
import { RoutesDetail } from '@prisma/client';

export class CreateRouteDetailUsecase {
  constructor(
    @Inject('RouteRepository')
    private readonly routeRepository: RouteRepositoryPort,
  ) {}

  async execute(routeDetail: CreateRouteDetailDto): Promise<RoutesDetail> {
    const createdRouteDetail = await this.routeRepository.createRouteDetail({
      city_id: routeDetail.city_id,
      routeId: routeDetail.routeId,
    });

    return createdRouteDetail;
  }
}
