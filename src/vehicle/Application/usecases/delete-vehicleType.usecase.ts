import { Inject } from "@nestjs/common";
import { VehicleRepositoryPort } from "src/vehicle/Domain/repositories/vehicle.repository.port";

export class DeleteVehicleTypeUsecase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort,
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.vehicleRepository.deleteVehicleType(id);
  }
}