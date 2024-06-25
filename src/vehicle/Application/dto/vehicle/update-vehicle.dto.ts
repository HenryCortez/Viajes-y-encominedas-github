import { IsOptional } from "class-validator";

export class UpdateVehicleDto {
    @IsOptional()
    licensePlate: string;
    @IsOptional()
    brand: string;
    @IsOptional()
    model: string;
    @IsOptional()
    color: string;
    @IsOptional()
    status : string;
    @IsOptional()
    enterpriseId?: number;
    @IsOptional()
    driverId?: number;
    @IsOptional()
    typeId: number;
}