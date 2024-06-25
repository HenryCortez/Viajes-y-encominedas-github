import { VehicleType } from "@prisma/client";
import { CreateVehicleDto} from "../../Application/dto/vehicle/create-vehicle.dto";
import { UpdateVehicleDto } from "../../Application/dto/vehicle/update-vehicle.dto";
import { CreateVehicleTypeDto } from "../../Application/dto/vehicleType/create-vehicleType.dto";
import { updateVehicleTypeDto } from "../../Application/dto/vehicleType/update-vehicleType.dto";

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