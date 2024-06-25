import { Reservation, ReservationDetail } from "@prisma/client";
import { CreateReservationDto } from "../../Application/dtos/create-reservation.dto";

export interface ReservationRepositoryPort {
    createReservation(reservation: CreateReservationDto): Promise<Reservation>;
    listReservations(): Promise<Reservation[]>;
    cancelReservation(reservationId: number): Promise<Reservation>;
    updateReservation(reservationId: number, reservation: Partial<CreateReservationDto>): Promise<Reservation>;
    listReservationDetails(reservationId: number): Promise<ReservationDetail[]>;
}
