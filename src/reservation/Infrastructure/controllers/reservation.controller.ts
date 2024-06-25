import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Post, Put, Res } from "@nestjs/common";
import { CreateReservationDto } from "src/reservation/Application/dtos/create-reservation.dto";
import { CancelReservationUsecase } from "src/reservation/Application/usecases/cancel-reservation.usecase";
import { CreateReservationUsecase } from "src/reservation/Application/usecases/create-reservation.usecase";
import { ListReservationDetailssUsecase } from "src/reservation/Application/usecases/list-reservation-details.usecase";
import { ListReservationsUsecase } from "src/reservation/Application/usecases/list-reservations.usecase";
import { UpdateReservationUsecase } from "src/reservation/Application/usecases/update-reservation.usecase";


@Controller('reservations/')
export class ReservationController {
    constructor(
        private readonly cancelReservationUseCase: CancelReservationUsecase,
        private readonly createReservationUseCase: CreateReservationUsecase,
        private readonly listReservationsUseCase: ListReservationsUsecase,
        private readonly updateReservationUsecase: UpdateReservationUsecase,
        private readonly listReservationDetailsUseCase: ListReservationDetailssUsecase
    ) {}

    @Get()
    async listReservations(@Res() res) {
        const reservations = await this.listReservationsUseCase.execute();

        return res.status(HttpStatus.OK).json(reservations);
    }

    @Get('/details/:id')
    async listReservationDetails(@Res() res, @Param('id', ParseIntPipe) id: number) {
        const reservationDetails = await this.listReservationDetailsUseCase.execute(id);

        return res.status(HttpStatus.OK).json(reservationDetails);
    }

    @Post('/create')
    async createReservation(@Res() res, @Body() reservation: CreateReservationDto) {
        const createdReservation = await this.createReservationUseCase.execute(reservation);

        return res.status(HttpStatus.CREATED).json(createdReservation);
    }

    @Delete('/cancel/:id')
    async cancelReservation(@Res() res, @Param('id', ParseIntPipe) id: number){
        const canceledReservation = await this.cancelReservationUseCase.execute(id);

        return res.status(HttpStatus.OK).json(canceledReservation);
    }

    @Put('/update/:id')
    async updateReservation(@Res() res, @Param('id', ParseIntPipe) id: number, @Body() reservation: Partial<CreateReservationDto>) {
        const updatedReservation = await this.updateReservationUsecase.execute(id, reservation);

        return res.status(HttpStatus.OK).json(updatedReservation);
    }

}