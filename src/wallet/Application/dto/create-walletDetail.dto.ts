import {IsNotEmpty, IsString, IsNumber} from "class-validator"

export class CreateWalletDetailDto {
    
    @IsNotEmpty()
    @IsNumber()
    walletId: number;
    @IsNotEmpty()
    @IsNumber()
    travelId: number;
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}