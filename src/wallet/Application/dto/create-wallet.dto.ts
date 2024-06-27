
import {IsNotEmpty, IsNumber } from "class-validator";

export class CreateWalletDto {
    
    @IsNotEmpty()
    @IsNumber()
    driverId: number;
    @IsNotEmpty()
    @IsNumber()
    balance: number;
}