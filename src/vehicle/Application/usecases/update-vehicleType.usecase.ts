import { VehicleType } from "@prisma/client";
import { VehicleRepositoryPort } from "src/vehicle/Domain/repositories/vehicle.repository.port";
import { updateVehicleTypeDto } from "../dto/vehicleType/update-vehicleType.dto";
import { Inject } from "@nestjs/common";

export class UpdateVehicleTypeUsecase {
  constructor(
    @Inject('VehicleRepository')
    private vehicleTypeRepository: VehicleRepositoryPort
  ) {}

  async execute(id: number, vehicleType: updateVehicleTypeDto): Promise<VehicleType> {

    return await this.vehicleTypeRepository.updateVehicleType(id, vehicleType, 3);

  }
}