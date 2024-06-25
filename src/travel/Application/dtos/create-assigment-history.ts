import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateAssignmentHistoryDto {
  
  @IsInt()
  @IsNotEmpty()
  driverId: number;

  @IsInt()
  @IsNotEmpty()
  vehicleId: number;

  updatedDate?: Date;
}
