import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { CreateAssignmentHistoryDto } from 'src/travel/Application/dtos/create-assigment-history';
import { CreateTravelDto } from 'src/travel/Application/dtos/create-travel.dto';
import { CreateAssignmentHistoryUsecase } from 'src/travel/Application/usecases/create-assigment-history.usecase';
import { CreateTravelUsecase } from 'src/travel/Application/usecases/create-travel.usecase';
import { ListTravelsUsecase } from 'src/travel/Application/usecases/list-travel.usecase';
import { UpdateAssignmentHistoryUsecase } from 'src/travel/Application/usecases/update-assigment-history.usecase';
import { UpdateTravelUsecase } from 'src/travel/Application/usecases/update-travel.usecase';

@ApiTags('Viajes')
@ApiBearerAuth()
@Controller('travels/')
@Role('admin', 'secretaria', 'conductor')
@UseGuards(AuthGuard, AuthorizationGuard)
export class TravelController {
  constructor(
    private readonly createTravelUseCase: CreateTravelUsecase,
    private readonly listTravelsUseCase: ListTravelsUsecase,
    private readonly updateAssignmentHistoryUsecase: UpdateAssignmentHistoryUsecase,
    private readonly createAssignmentHistoryUsecase: CreateAssignmentHistoryUsecase,
    private readonly updateTravelUsecase: UpdateTravelUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Viajes',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async listTravels(@Res() res) {
    const travels = await this.listTravelsUseCase.execute();

    return res.status(HttpStatus.OK).json(travels);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear Viaje',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async createTravel(@Res() res, @Body() travel: CreateTravelDto) {
    const createdTravel = await this.createTravelUseCase.execute(travel);

    return res.status(HttpStatus.CREATED).json(createdTravel);
  }

  @Post('/create/assigment')
  @ApiOperation({
    summary: 'Crear Historial de Asignación',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async createAssignmentHistory(
    @Res() res,
    @Body() assigment: CreateAssignmentHistoryDto,
  ) {
    const createdAssignmentHistory =
      await this.createAssignmentHistoryUsecase.execute(assigment);

    return res.status(HttpStatus.CREATED).json(createdAssignmentHistory);
  }

  @Put('/update/assigment/:id')
  @ApiOperation({
    summary: 'Actualizar Historial de Asignación',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async updateAssignmentHistory(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() assigment: Partial<CreateAssignmentHistoryDto>,
  ) {
    const updatedAssignmentHistory =
      await this.updateAssignmentHistoryUsecase.execute(id, assigment);

    return res.status(HttpStatus.OK).json(updatedAssignmentHistory);
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Actualizar Viaje',
    description:
      'Este endpoint es accesible por los roles: admin, secretaria, conductor.',
  })
  async updateTravel(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    const updatedTravel = await this.updateTravelUsecase.execute(id, status);

    return res.status(HttpStatus.OK).json(updatedTravel);
  }
}
