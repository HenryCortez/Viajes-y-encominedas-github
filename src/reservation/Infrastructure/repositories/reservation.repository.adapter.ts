import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateReservationDto } from 'src/reservation/Application/dtos/create-reservation.dto';
import { ReservationRepositoryPort } from 'src/reservation/Domain/repositories/reservation.repository.port';

@Injectable()
export class ReservationRepositoryAdapter implements ReservationRepositoryPort {
  constructor(private prisma: PrismaClient) {}
   async listReservationDetails(reservationId: number): Promise<any[]> {
        return await this.prisma.reservationDetail.findMany({
            where: { reservationId: reservationId },
        });
    }

  async createReservation(reservation: CreateReservationDto): Promise<any> {
    if (reservation.reservedSeats == 0 && reservation.reservedWeight == 0) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'You must reserve at least one seat or one weight.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const travel = await this.prisma.travel.findUnique({
      where: { id: reservation.travelId },
    });

    if (!travel || travel.status !=  'Activo') {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Travel not found.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (travel.availableSeats < reservation.reservedSeats) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'There are not enough seats available.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (travel.availableWeight < reservation.reservedWeight) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'There is not enough weight available.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    var createdreservation = await this.prisma.reservation.create({
      data: {
        oLongitude: reservation.oLongitude,
        oLatitude: reservation.oLatitude,
        dLongitude: reservation.dLongitude,
        dLatitude: reservation.dLatitude,
        userId: reservation.userId,
        travelId: reservation.travelId,
      },
    });

    var priceId;
    if (reservation.reservedSeats > 0) {
      priceId = 1;
      var price = await this.prisma.price.findUnique({
        where: { id: priceId },
      });
      await this.prisma.reservationDetail.create({
        data: {
          priceId: priceId,
          reservedSeats: reservation.reservedSeats,
          reservationId: createdreservation.id,
          subtotal: price.value * reservation.reservedSeats,
          reservedWeight: 0,
        },
      });
      await this.prisma.travel.update({
        where: { id: reservation.travelId },
        data: {
          availableSeats: travel.availableSeats - reservation.reservedSeats,
        },
      });
    }

    if (reservation.reservedWeight > 0) {
      if (reservation.reservedWeight <= 1) {
        priceId = 2;
      } else if (reservation.reservedWeight > 1 && reservation.reservedWeight <= 10) {
        priceId = 3;
      } else if (reservation.reservedWeight > 10 && reservation.reservedWeight <= 30) {
        priceId = 4;
      } else if (reservation.reservedWeight > 30 && reservation.reservedWeight <= 50) {
        priceId = 5;
      } else if (reservation.reservedWeight > 50 && reservation.reservedWeight <= 100) {
        priceId = 6;
      } else if (reservation.reservedWeight > 100) {
        priceId = 7;
      }

      var price = await this.prisma.price.findUnique({
        where: { id: priceId },
      });

      await this.prisma.reservationDetail.create({
        data: {
          priceId: priceId,
          reservedSeats: 0,
          reservationId: createdreservation.id,
          subtotal: price.value,
          reservedWeight: reservation.reservedWeight,
        },
      });

      await this.prisma.travel.update({
        where: { id: reservation.travelId },
        data: {
          availableWeight: travel.availableWeight - reservation.reservedWeight,
        },
      });
    }

    createdreservation = await this.prisma.reservation.update({
      where: { id: createdreservation.id },
      data: {
        total: (
          await this.prisma.reservationDetail.aggregate({
            _sum: {
              subtotal: true,
            },
            where: {
              reservationId: createdreservation.id,
            },
          })
        )._sum.subtotal,
      },
    });

    return createdreservation;
  }

  async listReservations(): Promise<any[]> {
    return await this.prisma.reservation.findMany();
  }

  async cancelReservation(reservationId: number): Promise<any> {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id: reservationId },
    });
    const travel = await this.prisma.travel.findUnique({
      where: { id: reservation.travelId },
    });

    const reservationDetails = await this.prisma.reservationDetail.findMany({
      where: { reservationId: reservationId },
    });

    await this.prisma.travel.update({
      where: { id: reservation.travelId },
      data: {
        availableSeats:
          travel.availableSeats +
          reservationDetails.reduce(
            (acc, detail) => acc + detail.reservedSeats,
            0,
          ),
        availableWeight:
          travel.availableWeight +
          reservationDetails.reduce(
            (acc, detail) => acc + detail.reservedWeight,
            0,
          ),
      },
    });

    return this.prisma.$transaction(async (prisma) => {
      // Primero, elimina los detalles de la reserva
      await prisma.reservationDetail.deleteMany({
        where: { reservationId: reservationId },
      });

      // Luego, elimina la reserva
      await prisma.reservation.delete({
        where: { id: reservationId },
      });
    });
  }

  async updateReservation(reservationId: number, reservation: Partial<CreateReservationDto>,
  ): Promise<any> {
    return this.prisma.reservation.update({
      where: { id: reservationId },
      data: reservation,
    });
  }
}
