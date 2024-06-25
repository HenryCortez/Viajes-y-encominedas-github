import { VehicleRepositoryPort } from "../../Domain/repositories/vehicle.repository.port";
import { CreateVehicleTypeDto } from "../dto/vehicleType/create-vehicleType.dto";
import { VehicleType } from "@prisma/client";
import { Inject } from "@nestjs/common";

export class CreateVehicleTypeUsecase {
  constructor(
    @Inject('VehicleRepository') private vehicleTypeRepository: VehicleRepositoryPort
  ) {}

  async execute(vehicleType: CreateVehicleTypeDto): Promise<VehicleType> {
    return await this.vehicleTypeRepository.createVehicleType({
    type : vehicleType.type,
    seats_amount : vehicleType.seats_amount,
    max_charge : vehicleType.max_charge,
    });
  }
}