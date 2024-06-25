import { VehicleRepositoryPort } from "src/vehicle/Domain/repositories/vehicle.repository.port";
import { CreateVehicleDto } from "../dto/vehicle/create-vehicle.dto";
import { Vehicle } from "@prisma/client";
import { Inject } from "@nestjs/common";

export class CreateVehicleUsecase {
  constructor(
    @Inject('VehicleRepository') private vehicleRepository: VehicleRepositoryPort
  ) {}

  async execute(vehicle: Partial<CreateVehicleDto>): Promise<Vehicle> {
    return await this.vehicleRepository.createVehicle(vehicle);
  }
}