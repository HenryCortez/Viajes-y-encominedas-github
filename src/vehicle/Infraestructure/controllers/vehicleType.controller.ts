import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { VehicleType } from "@prisma/client";
import { CreateVehicleTypeDto } from "../../Application/dto/vehicleType/create-vehicleType.dto";
import { updateVehicleTypeDto } from "../../Application/dto/vehicleType/update-vehicleType.dto";
import { CreateVehicleTypeUsecase, UpdateVehicleTypeUsecase, ListVehicleTypeUsecase, DeleteVehicleTypeUsecase } from "../../Application/usecases";

@Controller('vehicleTypes/')
export class VehicleTypeController {
  constructor(
    private readonly createVehicleTypeUsecase: CreateVehicleTypeUsecase,
    private readonly updateVehicleTypeUsecase: UpdateVehicleTypeUsecase,
    private readonly listVehicleTypeUsecase: ListVehicleTypeUsecase,
    private readonly deleteVehicleTypeUsecase: DeleteVehicleTypeUsecase,
  ) { }

  @Post('/create')
  
  async createVehicleType(@Res() request, @Body() vehicleType: CreateVehicleTypeDto): Promise<VehicleType> {

    const createdVehicleType = await this.createVehicleTypeUsecase.execute(vehicleType);
    return request.status(HttpStatus.CREATED).json(createdVehicleType);
  }

  @Patch(':id')
 
  async updateVehicleType(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() vehicleType: updateVehicleTypeDto,
  ): Promise<VehicleType> {
    const updatedVehicleType = await this.updateVehicleTypeUsecase.execute(id, vehicleType);
    return request.status(HttpStatus.OK).json(updatedVehicleType);
  }

  @Delete(':id')
 
  async deleteVehicleType(@Res() request, @Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const deletedVehicleType = await this.deleteVehicleTypeUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedVehicleType);
  }

  @Get()

  async listVehicleTypes(@Res() request): Promise<VehicleType[]> {
    const vehicleTypes = await this.listVehicleTypeUsecase.execute();
    return request.status(HttpStatus.OK).json(vehicleTypes);
  }
}