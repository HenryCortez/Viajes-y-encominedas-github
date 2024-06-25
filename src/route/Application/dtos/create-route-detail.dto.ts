import { IsNumber } from 'class-validator';

export class CreateRouteDetailDto {
  @IsNumber()
  city_id: number;

  @IsNumber()
  routeId: number;
}
