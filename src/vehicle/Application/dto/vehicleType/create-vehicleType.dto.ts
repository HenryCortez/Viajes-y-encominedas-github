import { IsString, IsNumber } from 'class-validator';

export class CreateVehicleTypeDto { 
    @IsString()
    type: string;
    @IsNumber()
    seats_amount: number;
    @IsNumber()
    max_charge: number;
}