import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Vehicle } from '@prisma/client';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { CreateVehicleDto } from 'src/vehicle/Application/dto/vehicle/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/vehicle/Application/dto/vehicle/update-vehicle.dto';
import {
  CreateVehicleUsecase,
  DeleteVehicleUsecase,
  ListVehicleUsecase,
  UpdateVehicleUsecase,
} from 'src/vehicle/Application/usecases';

@ApiTags('Vehiculos')
@ApiBearerAuth()
@Controller('vehicles/')
@Role('admin', 'secretaria', 'conductor')
@UseGuards(AuthGuard, AuthorizationGuard)
export class VehicleController {
  constructor(
    private readonly createVehicleUsecase: CreateVehicleUsecase,
    private readonly deleteVehicleUsecase: DeleteVehicleUsecase,
    private readonly listVehicleUsecase: ListVehicleUsecase,
    private readonly updateVehicleUsecase: UpdateVehicleUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar vehículos',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async listVehicles(@Res() request): Promise<Vehicle[]> {
    const vehicles = await this.listVehicleUsecase.execute();
    return request.status(HttpStatus.OK).json(vehicles);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crea un nuevo vehículo',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async createVehicle(
    @Res() request,
    @Body() vehicle: Partial<CreateVehicleDto>,
  ): Promise<Vehicle> {
    const createdVehicle = await this.createVehicleUsecase.execute(vehicle);
    return request.status(HttpStatus.CREATED).json(createdVehicle);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Editar un vehículo',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async updateVehicle(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() vehicle: Partial<UpdateVehicleDto>,
  ): Promise<Vehicle> {
    const updatedVehicle = await this.updateVehicleUsecase.execute(id, vehicle);
    return request.status(HttpStatus.OK).json(updatedVehicle);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un nuevo vehículo',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async deleteVehicle(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    const deletedVehicle = await this.deleteVehicleUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedVehicle);
  }
}
