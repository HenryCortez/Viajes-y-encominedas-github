import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateTravelDto {
  @IsString()
  @IsNotEmpty()
  departure_date: string;

  @IsString()
  @IsNotEmpty()
  departure_time: string;

  @IsInt()
  @IsNotEmpty()
  assignmentHistoryId: number;

  @IsInt()
  @Min(1)
  availableSeats?: number;

  @IsNumber()
  @Min(100)
  availableWeight?: number;

  @IsInt()
  @IsNotEmpty()
  routeId: number;
}
