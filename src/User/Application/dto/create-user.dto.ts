import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  
  name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  surname: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
  passwordHash?: string;

  passwordSalt?: string;

  enterpriseId?: number;
}
