import { IsBoolean } from 'class-validator';

export class UpdateDriverDto {
  dataFile?: string;

  @IsBoolean()
  status?: boolean;
}
