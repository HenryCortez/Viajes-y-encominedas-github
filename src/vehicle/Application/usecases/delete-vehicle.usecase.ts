import {Inject} from '@nestjs/common';
import {VehicleRepositoryPort} from '../../Domain/repositories/vehicle.repository.port';

export class DeleteVehicleUsecase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.vehicleRepository.deleteVehicle(id);
  }
}  