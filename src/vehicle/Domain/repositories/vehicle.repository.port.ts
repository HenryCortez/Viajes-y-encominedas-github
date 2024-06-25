import { VehicleType } from "@prisma/client";
import { CreateVehicleDto} from "src/vehicle/Application/dto/vehicle/create-vehicle.dto";
import { UpdateVehicleDto } from "src/vehicle/Application/dto/vehicle/update-vehicle.dto";
import { CreateVehicleTypeDto } from "src/vehicle/Application/dto/vehicleType/create-vehicleType.dto";
import { updateVehicleTypeDto } from "src/vehicle/Application/dto/vehicleType/update-vehicleType.dto";

export interface VehicleRepositoryPort {
    createVehicle(vehicle: any): Promise<any>;
    updateVehicle(id:number,vehicle: any): Promise<any>;
    deleteVehicle(id: number): Promise<boolean>;
    listVehicle(): Promise<any>;

    createVehicleType(vehicleType: any): Promise<any>;
    updateVehicleType(id:number,vehicleType: updateVehicleTypeDto, i: number): Promise<VehicleType>;
    deleteVehicleType(id: number): Promise<boolean>;
    listVehicleType(): Promise<any>;
}