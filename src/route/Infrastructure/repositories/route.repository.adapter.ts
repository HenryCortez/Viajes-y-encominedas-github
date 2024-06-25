import { Injectable } from '@nestjs/common';
import { PrismaClient, Route, RoutesDetail } from '@prisma/client';
import { CreateRouteDetailDto } from '../../Application/dtos/create-route-detail.dto';
import { CreateRouteDto } from '../../Application/dtos/create-route.dto';
import { RouteRepositoryPort } from '../../Domain/repositories/route.repository.port';

@Injectable()
export class RouteRepostoryAdapter implements RouteRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async createRoute(route: CreateRouteDto): Promise<Route> {
    if (route.origin_city_id === route.destination_city_id) {
      throw new Error('Origin and destination cities must be different');
    }

    const createdRoute = await this.prisma.route.create({
      data: {
        origin_city_id: route.origin_city_id,
        destination_city_id: route.destination_city_id,
      },
    });

    return createdRoute;
  }

  async createRouteDetail(
    routeDetail: CreateRouteDetailDto,
  ): Promise<RoutesDetail> {
    const route = await this.prisma.route.findFirst({
      where: {
        id: routeDetail.routeId,
      },
    });

    if (
      routeDetail.city_id === route.origin_city_id ||
      routeDetail.city_id === route.destination_city_id
    ) {
      throw new Error('City already exists in the route');
    }

    const createdRouteDetail = await this.prisma.routesDetail.create({
      data: {
        city_id: routeDetail.city_id,
        routeId: routeDetail.routeId,
      },
    });

    return createdRouteDetail;
  }

  async getRoutesByOriginCityName(cityName: string): Promise<Route[]> {
    const routes = await this.prisma.route.findMany({
      where: {
        origin_city: {
          name: cityName,
        },
      },
    });

    return routes;
  }

  async getRoutesByDestinationCityName(cityName: string): Promise<Route[]> {
    const routes = await this.prisma.route.findMany({
      where: {
        destination_city: {
          name: cityName,
        },
      },
    });

    return routes;
  }
}
