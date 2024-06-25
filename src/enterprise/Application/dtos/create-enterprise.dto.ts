import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEnterpriseDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
