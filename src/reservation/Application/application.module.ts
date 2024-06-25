import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { CancelReservationUsecase } from './usecases/cancel-reservation.usecase';
import { CreateReservationUsecase } from './usecases/create-reservation.usecase';
import { ListReservationsUsecase } from './usecases/list-reservations.usecase';
import { UpdateReservationUsecase } from './usecases/update-reservation.usecase';
import { ReservationRepositoryAdapter } from '../Infrastructure/repositories/reservation.repository.adapter';
import { ListReservationDetailssUsecase } from './usecases/list-reservation-details.usecase';

@Module({
    imports: [CommonModule],
    providers: [
        CancelReservationUsecase,
        CreateReservationUsecase,
        ListReservationsUsecase,
        UpdateReservationUsecase,
        ListReservationDetailssUsecase,
        {
            provide: 'ReservationRepository',
            useClass: ReservationRepositoryAdapter,
        }
    ],
    exports: [
        CancelReservationUsecase,
        CreateReservationUsecase,
        ListReservationsUsecase,
        UpdateReservationUsecase,
        'ReservationRepository',
        ListReservationDetailssUsecase
    ],
})
export class ReservationApplicationModule {}
