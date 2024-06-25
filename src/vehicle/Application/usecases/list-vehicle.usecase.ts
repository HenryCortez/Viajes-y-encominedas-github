import {Inject} from '@nestjs/common';
import {Vehicle} from '@prisma/client';
import {VehicleRepositoryPort} from '../../Domain/repositories/vehicle.repository.port';

export class ListVehicleUsecase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(): Promise<Vehicle[]> {
    return await this.vehicleRepository.listVehicle();
  }
}