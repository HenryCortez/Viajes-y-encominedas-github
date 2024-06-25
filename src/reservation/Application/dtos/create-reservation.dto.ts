import { IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min } from "class-validator"

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    oLatitude

    @IsString()
    @IsNotEmpty()
    oLongitude

    @IsString()
    @IsNotEmpty()
    dLatitude

    @IsString()
    @IsNotEmpty()
    dLongitude

    @IsInt()
    @IsNotEmpty()
    userId

    @IsInt()
    @IsNotEmpty()
    travelId

    @IsInt()
    @IsOptional()
    @Min(1)
    reservedSeats?

    @IsNumber()
    @IsOptional()
    @Min(0)
    reservedWeight?
}