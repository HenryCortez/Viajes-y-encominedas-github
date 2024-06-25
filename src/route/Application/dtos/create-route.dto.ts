import { IsNumber } from 'class-validator';

export class CreateRouteDto {
  @IsNumber()
  origin_city_id: number;

  @IsNumber()
  destination_city_id: number;
}
