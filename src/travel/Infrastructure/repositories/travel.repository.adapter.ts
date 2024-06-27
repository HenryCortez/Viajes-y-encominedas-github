import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { $Enums, PrismaClient, Travel } from '@prisma/client';
import { CreateAssignmentHistoryDto } from 'src/travel/Application/dtos/create-assigment-history';
import { CreateTravelDto } from 'src/travel/Application/dtos/create-travel.dto';
import { TravelRepositoryPort } from 'src/travel/Domain/repositories/travel.repository,port';

@Injectable()
export class TravelRepositoryAdapter implements TravelRepositoryPort {
  constructor(private prisma: PrismaClient) {}
  
  async createTravel(travel: CreateTravelDto): Promise<any> {
    const departure_datetime = new Date(`${travel.departure_date}T${travel.departure_time}`);
    departure_datetime.setUTCHours(departure_datetime.getUTCHours() - 5);
    console.log(departure_datetime);
    const assigmentHistory = await this.prisma.assignmentHistory.findUnique({
      where: {
        id: travel.assignmentHistoryId,
      },
    });
    const vehicle = await this.prisma.vehicle.findUnique({
      where: {
        id: assigmentHistory.vehicleId,
      },
    });
    const type = await this.prisma.vehicleType.findUnique({
      where: {
        id: vehicle.typeId,
      },
    });
    if (travel.availableSeats >= type.seats_amount) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Available seats is greater than vehicle seats',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    var weight = 0;
    switch (type.type) {
      case 'Particular':
        weight = 125;
        break;
      case 'Camioneta':
        weight = 1125;
        break;
      case 'Camión':
        weight = 9775;
        break;
      case 'Buseta':
        weight = 500;
        break;
    }
    if (travel.availableWeight > weight) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Available weight is greater than vehicle weight capacity, the max is ' + weight + ' kg',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const createdTravel = await this.prisma.travel.create({
      data: {
        departure_datetime: departure_datetime,
        assignmentHistoryId: travel.assignmentHistoryId,
        availableSeats: travel.availableSeats,
        availableWeight: travel.availableWeight,
        routeId: travel.routeId,
      },
    });
    return createdTravel;
  }

  async createAssignmentHistory(
    assignmentHistory: CreateAssignmentHistoryDto,
  ): Promise<any> {
    const createdAssigmentHistory = await this.prisma.assignmentHistory.create({
      data: {
        driverId: assignmentHistory.driverId,
        vehicleId: assignmentHistory.vehicleId,
      },
    });
    return createdAssigmentHistory;
  }

  async updateAssignmentHistory(assignmentHistoryid: number,
    assignmentHistory: Partial<CreateAssignmentHistoryDto>,
  ): Promise<any> {
    assignmentHistory.updatedDate = new Date();
    assignmentHistory.updatedDate.setUTCHours(assignmentHistory.updatedDate.getUTCHours() - 5);
    const updatedAssignmentHistory = await this.prisma.assignmentHistory.update({
        where: {
            id: assignmentHistoryid,
        },
        data: assignmentHistory,
    });
    return updatedAssignmentHistory;
  }

  async updateTravel(travelid: number, status: string): Promise<any> {
    let travel: Travel;
    switch (status){
      case "cancelar":
        travel = await this.cancelTravel(travelid);
        break;
      case "empezar":
        travel = await this.changeStatus(travelid, 'Viajando');
        break;
      case "terminar":
        travel = await this.changeStatus(travelid, 'Finalizado');
        let history = await this.prisma.assignmentHistory.findUnique({
          where: {
            id: travel.assignmentHistoryId,
          },
        });
        let wallet = await this.prisma.wallet.findUnique({
          where: {
            driverId: history.driverId,
          },
        });
        await this.prisma.walletTransaction.create({
          data: {
            travelId: travelid,
            walletId: wallet.id,
            transactionDate: new Date(),
            amount: (
              await this.prisma.reservation.aggregate({
                _sum: {
                  total: true,
                },
                where: {
                  travelId: travelid,
                },
              })
            )._sum.total,
          },
        });
        await this.prisma.wallet.update({
          where: {
            id: wallet.id,
          },
          data: {
            balance: (
              await this.prisma.walletTransaction.aggregate({
                _sum: {
                  amount: true,
                },
                where: {
                  walletId: wallet.id,
                },
              })
            )._sum.amount,
          },
        });
        break;
    }
    return travel;
  }

  async listTravels(): Promise<any[]> {
    const travels = await this.prisma.travel.findMany();
    return travels;
  }

  async cancelTravel(travelId: number): Promise<any> {
    const currentTravel = await this.prisma.travel.findUnique({
        where: {
            id: travelId,
        },
    });
    var now = new Date();
    now.setUTCHours(now.getUTCHours() - 5);
    const timeDifference = currentTravel.departure_datetime.getTime() - now.getTime();
    console.log(timeDifference);
    if (timeDifference < 30 * 60 * 1000) {
        throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Cannot edit travel less than 30 minutes before departure',
            },
            HttpStatus.BAD_REQUEST,
          );
    }

    const canceledtravel = await this.prisma.travel.update({
        where: {
            id: travelId,
        },
        data: {
            status: 'Cancelado',
        },
    });
    return canceledtravel;
  }

  async changeStatus(travelId: number, status: $Enums.Status): Promise<any> {
    const travel = await this.prisma.travel.findUnique({
        where: {
            id: travelId,
        },
    });
    if (travel.status === 'Cancelado') {
        throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: 'Cannot edit a canceled travel',
            },
            HttpStatus.BAD_REQUEST,
          );
    }
    const updatedTravel = await this.prisma.travel.update({
        where: {
            id: travelId,
        },
        data: {
            status: status,
        },
    });
    return updatedTravel;
  }



}
