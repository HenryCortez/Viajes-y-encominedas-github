import { Inject } from "@nestjs/common";
import { VehicleType } from "@prisma/client";
import { VehicleRepositoryPort } from "../../Domain/repositories/vehicle.repository.port";

export class ListVehicleTypeUsecase {
  constructor(
    @Inject('VehicleRepository') private vehicleTypeRepository: VehicleRepositoryPort
  ) {}

  async execute(): Promise<VehicleType[]> {
    return await this.vehicleTypeRepository.listVehicleType();
  }
}