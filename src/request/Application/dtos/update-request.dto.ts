import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateRequestDto {
  @IsNotEmpty()
  @IsBoolean()
  status: boolean;
}
