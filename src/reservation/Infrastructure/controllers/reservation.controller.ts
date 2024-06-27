import {
  Body,
  Controller,
  Delete,
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
import { CreateReservationDto } from 'src/reservation/Application/dtos/create-reservation.dto';
import { CancelReservationUsecase } from 'src/reservation/Application/usecases/cancel-reservation.usecase';
import { CreateReservationUsecase } from 'src/reservation/Application/usecases/create-reservation.usecase';
import { ListReservationDetailssUsecase } from 'src/reservation/Application/usecases/list-reservation-details.usecase';
import { ListReservationsUsecase } from 'src/reservation/Application/usecases/list-reservations.usecase';
import { UpdateReservationUsecase } from 'src/reservation/Application/usecases/update-reservation.usecase';

@ApiTags('Reservaciones')
@ApiBearerAuth()
@Controller('reservations/')
@UseGuards(AuthGuard)
export class ReservationController {
  constructor(
    private readonly cancelReservationUseCase: CancelReservationUsecase,
    private readonly createReservationUseCase: CreateReservationUsecase,
    private readonly listReservationsUseCase: ListReservationsUsecase,
    private readonly updateReservationUsecase: UpdateReservationUsecase,
    private readonly listReservationDetailsUseCase: ListReservationDetailssUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Reservaciones',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuarios.',
  })
  async listReservations(@Res() res) {
    const reservations = await this.listReservationsUseCase.execute();

    return res.status(HttpStatus.OK).json(reservations);
  }

  @Get('/details/:id')
  @ApiOperation({
    summary: 'Listar Detalles de Reservación',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuarios.',
  })
  async listReservationDetails(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const reservationDetails =
      await this.listReservationDetailsUseCase.execute(id);

    return res.status(HttpStatus.OK).json(reservationDetails);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear Reservación',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuarios.',
  })
  async createReservation(
    @Res() res,
    @Body() reservation: CreateReservationDto,
  ) {
    const createdReservation =
      await this.createReservationUseCase.execute(reservation);

    return res.status(HttpStatus.CREATED).json(createdReservation);
  }

  @Delete('/cancel/:id')
  @ApiOperation({
    summary: 'Cancelar Reservación',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuarios.',
  })
  async cancelReservation(@Res() res, @Param('id', ParseIntPipe) id: number) {
    const canceledReservation = await this.cancelReservationUseCase.execute(id);

    return res.status(HttpStatus.OK).json(canceledReservation);
  }

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Actualizar Reservación',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuarios.',
  })
  async updateReservation(
    @Res() res,
    @Param('id', ParseIntPipe) id: number,
    @Body() reservation: Partial<CreateReservationDto>,
  ) {
    const updatedReservation = await this.updateReservationUsecase.execute(
      id,
      reservation,
    );

    return res.status(HttpStatus.OK).json(updatedReservation);
  }
}
