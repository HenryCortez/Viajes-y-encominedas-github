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
import { VehicleType } from '@prisma/client';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { CreateVehicleTypeDto } from 'src/vehicle/Application/dto/vehicleType/create-vehicleType.dto';
import { updateVehicleTypeDto } from 'src/vehicle/Application/dto/vehicleType/update-vehicleType.dto';
import {
  CreateVehicleTypeUsecase,
  UpdateVehicleTypeUsecase,
  ListVehicleTypeUsecase,
  DeleteVehicleTypeUsecase,
} from 'src/vehicle/Application/usecases';

@ApiTags('Tipos de vehiculos')
@ApiBearerAuth()
@Controller('vehicleTypes/')
@Role('admin', 'secretaria', 'conductor')
@UseGuards(AuthGuard, AuthorizationGuard)
export class VehicleTypeController {
  constructor(
    private readonly createVehicleTypeUsecase: CreateVehicleTypeUsecase,
    private readonly updateVehicleTypeUsecase: UpdateVehicleTypeUsecase,
    private readonly listVehicleTypeUsecase: ListVehicleTypeUsecase,
    private readonly deleteVehicleTypeUsecase: DeleteVehicleTypeUsecase,
  ) {}

  @Post('/create')
  @ApiOperation({
    summary: 'Listar Tipos de Vehiculos',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async createVehicleType(
    @Res() request,
    @Body() vehicleType: CreateVehicleTypeDto,
  ): Promise<VehicleType> {
    const createdVehicleType =
      await this.createVehicleTypeUsecase.execute(vehicleType);
    return request.status(HttpStatus.CREATED).json(createdVehicleType);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar Tipo de Vehiculo',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async updateVehicleType(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() vehicleType: updateVehicleTypeDto,
  ): Promise<VehicleType> {
    const updatedVehicleType = await this.updateVehicleTypeUsecase.execute(
      id,
      vehicleType,
    );
    return request.status(HttpStatus.OK).json(updatedVehicleType);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar Tipo de Vehiculo',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async deleteVehicleType(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    const deletedVehicleType = await this.deleteVehicleTypeUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedVehicleType);
  }

  @Get()
  @ApiOperation({
    summary: 'Listar Tipos de Vehiculos',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async listVehicleTypes(@Res() request): Promise<VehicleType[]> {
    const vehicleTypes = await this.listVehicleTypeUsecase.execute();
    return request.status(HttpStatus.OK).json(vehicleTypes);
  }
}
