import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMenuDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  parentId?: number;
}
