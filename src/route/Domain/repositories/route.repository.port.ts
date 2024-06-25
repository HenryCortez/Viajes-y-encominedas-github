import { Route, RoutesDetail } from '@prisma/client';

export interface RouteRepositoryPort {
  createRoute(route: Partial<Route>): Promise<Route>;
  createRouteDetail(routeDetail: Partial<RoutesDetail>): Promise<RoutesDetail>;
  getRoutesByOriginCityName(cityName: string): Promise<Route[]>;
  getRoutesByDestinationCityName(cityName: string): Promise<Route[]>;
}
