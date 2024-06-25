import { IsString, IsNotEmpty, IsNumber, Length } from 'class-validator';

export class CreateVehicleDto {

    @IsString()
    @IsNotEmpty()
    @Length(6,6)
    licensePlate: string;
    @IsString()
    @IsNotEmpty()
    brand: string;
    @IsString()
    @IsNotEmpty()
    model: string;
    @IsString()
    @IsNotEmpty()
    color: string;
    @IsString()
    @IsNotEmpty()
    status : string;
    @IsNumber()
    enterpriseId?: number;
    @IsNumber()
    typeId: number;
    @IsNumber()
    driverId?: number;
}