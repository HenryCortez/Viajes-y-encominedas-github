import { Driver } from '@prisma/client';
import { UpdateRequestEvent } from '../../../request/Infrastructure/events/update.request.event';

export interface DriverRepositoryPort {
  createDriver(
    fileName: string,
    file: Buffer,
    driver: Partial<Driver>,
  ): Promise<any>;
  listDrivers(): Promise<Driver[]>;
  updateDriver(payload: UpdateRequestEvent): Promise<Driver>;
  deleteDriver(id: number): Promise<boolean>;
}
