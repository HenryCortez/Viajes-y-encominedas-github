import { Vehicle } from "@prisma/client";
import { VehicleRepositoryPort } from "../../Domain/repositories/vehicle.repository.port";
import {UpdateVehicleDto} from '../dto/vehicle/update-vehicle.dto';
import {Inject} from "@nestjs/common";


export class UpdateVehicleUsecase {
  constructor(
    @Inject('VehicleRepository')
    private vehicleRepository: VehicleRepositoryPort
  ) {}

  async execute(id: number, vehicle: Partial<UpdateVehicleDto>): Promise<Vehicle> {
    return await this.vehicleRepository.updateVehicle(id, vehicle);
  }
}
