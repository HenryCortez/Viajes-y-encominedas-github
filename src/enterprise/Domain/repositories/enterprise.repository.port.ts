import { Enterprise } from '@prisma/client';

export interface EnterpriseRepositoryPort {
  createEnterprise(enterprise: Partial<Enterprise>): Promise<Enterprise>;
  listEnterprises(): Promise<Enterprise[]>;
  getEnterpriseById(id: number): Promise<Enterprise>;
  updateEnterprise(
    id: number,
    enterprise: Partial<Enterprise>,
  ): Promise<Enterprise>;
  deleteEnterprise(id: number): Promise<boolean>;
}
