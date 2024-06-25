import { Request } from '@prisma/client';
import { NewDriverEvent } from 'src/driver/Infrastructure/events/new.driver.event';

export interface RequestRepositoryPort {
  createRequest(payload: NewDriverEvent): Promise<Request>;
  getRequestsByEnterpriseId(request: any): Promise<Request[]>;
  updateRequest(requestId: number, request: Partial<Request>): Promise<Request>;
}
