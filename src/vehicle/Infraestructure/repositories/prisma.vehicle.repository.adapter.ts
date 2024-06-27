import { HttpException, Injectable } from '@nestjs/common';
import { Vehicle, PrismaClient, VehicleType } from '@prisma/client';
import { CreateVehicleDto } from 'src/vehicle/Application/dto/vehicle/create-vehicle.dto';
import { UpdateVehicleDto } from 'src/vehicle/Application/dto/vehicle/update-vehicle.dto';
import { CreateVehicleTypeDto } from 'src/vehicle/Application/dto/vehicleType/create-vehicleType.dto';
import { updateVehicleTypeDto } from 'src/vehicle/Application/dto/vehicleType/update-vehicleType.dto';
import { VehicleRepositoryPort } from 'src/vehicle/Domain/repositories/vehicle.repository.port';

@Injectable()
export class PrismaVehicleRepositoryAdapter implements VehicleRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async createVehicle(vehicle: CreateVehicleDto): Promise<Vehicle> {
    var driver = null;
    try {
      driver = await this.prisma.driver.findUnique({
      where: { id: vehicle.driverId },
    });

    if (!driver || driver.status !== true) {
      throw new Error('Driver is not active');
    }
  } catch (error) {
    console.log("No usa driver")
  }
    return await this.prisma.vehicle.create({
      data: {
        licence_plate: vehicle.licensePlate,
        brand: vehicle.brand,
        model: vehicle.model,
        color: vehicle.color,
        status: vehicle.status,
        enterpriseId: vehicle.enterpriseId,
        typeId: vehicle.typeId,
        driverId: vehicle.driverId,
      },
    });
  }
  async listVehicle(): Promise<Vehicle[]> {
    return await this.prisma.vehicle.findMany();
  }

  async updateVehicle(
    id: number,
    vehicle: Partial<UpdateVehicleDto>,
  ): Promise<Vehicle> {
    console.log(id, vehicle);

    if (vehicle.status != undefined) {
      return this.prisma.vehicle.update({
        where: {
          id,
        },
        data: {
          licence_plate: vehicle.licensePlate,
          brand: vehicle.brand,
          model: vehicle.model,
          color: vehicle.color,
          status: vehicle.status,
          enterpriseId: vehicle.enterpriseId,
          typeId: vehicle.typeId,
          driverId: vehicle.driverId,
        },
      });
    }
  }

  async deleteVehicle(vehicleId: number): Promise<boolean> {
    try {
      await this.prisma.vehicle.delete({
        where: {
          id: vehicleId,
        },
      });
      return true;
    } catch (error) {
      console.log(error);

      throw new HttpException('Error', 500);
    }
  }

  async createVehicleType(
    vehicleType: CreateVehicleTypeDto,
  ): Promise<VehicleType> {
    console.log(vehicleType);

    return await this.prisma.vehicleType.create({
      data: {
        type: vehicleType.type,
        seats_amount: vehicleType.seats_amount,
        max_charge: vehicleType.max_charge,
      },
    });
  }

  async listVehicleType(): Promise<any> {
    return await this.prisma.vehicleType.findMany();
  }

  async updateVehicleType(
    id: number,
    vehicleType: updateVehicleTypeDto,
    i: number,
  ): Promise<VehicleType> {
    console.log('repositoryAdapter');

    return await this.prisma.vehicleType.update({
      where: { id },
      data: {
        type: vehicleType.type,
        seats_amount: vehicleType.seats_amount,
        max_charge: vehicleType.max_charge,
      },
    });
  }

  async deleteVehicleType(id: number): Promise<boolean> {
    try {
      this.prisma.vehicleType.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new HttpException('Error', 500);
    }
    return true;
  }
}
