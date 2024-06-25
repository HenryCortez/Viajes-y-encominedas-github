import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Vehicle } from "@prisma/client";
import { Role } from "../../../authorization/Infrastructure/decorators/authorization.decorator";
import { AuthorizationGuard } from "../../../authorization/Infrastructure/guards/authorization.guard";
import { CreateVehicleDto } from "../../Application/dto/vehicle/create-vehicle.dto";
import { UpdateVehicleDto } from "../../Application/dto/vehicle/update-vehicle.dto";
import { CreateVehicleUsecase, DeleteVehicleUsecase, ListVehicleUsecase, UpdateVehicleUsecase } from "../../Application/usecases";

@Controller('vehicles/')
//@UseGuards(AuthorizationGuard)
export class VehicleController {
  constructor(
    private readonly createVehicleUsecase: CreateVehicleUsecase,
    private readonly deleteVehicleUsecase: DeleteVehicleUsecase,
    private readonly listVehicleUsecase: ListVehicleUsecase,
    private readonly updateVehicleUsecase: UpdateVehicleUsecase,
  ) {}

  @Get()
 // @Role('admin')

  async listVehicles(@Res() request): Promise<Vehicle[]> {
    const vehicles = await this.listVehicleUsecase.execute();
    return request.status(HttpStatus.OK).json(vehicles);
  }

  @Post('/create')
  //@Role('admin')
  
  async createVehicle(@Res() request, @Body() vehicle: Partial<CreateVehicleDto>): Promise<Vehicle> {
    const createdVehicle = await this.createVehicleUsecase.execute(vehicle);
    return request.status(HttpStatus.CREATED).json(createdVehicle);
  }

  @Patch(':id')
  //@Role('admin')

  async updateVehicle(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() vehicle: Partial<UpdateVehicleDto>,
  ): Promise<Vehicle> {
    const updatedVehicle = await this.updateVehicleUsecase.execute(id, vehicle);
    return request.status(HttpStatus.OK).json(updatedVehicle);
  }

  @Delete(':id')
 // @Role('admin')

  async deleteVehicle(@Res() request, @Param('id', ParseIntPipe) id: number): Promise<boolean> {
    const deletedVehicle = await this.deleteVehicleUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedVehicle);
  }
}