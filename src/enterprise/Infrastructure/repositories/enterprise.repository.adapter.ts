import { Injectable } from '@nestjs/common';
import { Enterprise, PrismaClient } from '@prisma/client';
import { CreateEnterpriseDto } from 'src/enterprise/Application/dtos/create-enterprise.dto';
import { EnterpriseRepositoryPort } from 'src/enterprise/Domain/repositories/enterprise.repository.port';

@Injectable()
export class EnterpriseRepositoryAdapter implements EnterpriseRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async createEnterprise(enterprise: CreateEnterpriseDto): Promise<Enterprise> {
    return await this.prisma.enterprise.create({
      data: {
        name: enterprise.name,
      },
    });
  }

  async listEnterprises(): Promise<Enterprise[]> {
    return await this.prisma.enterprise.findMany();
  }

  async getEnterpriseById(id: number): Promise<Enterprise> {
    return await this.prisma.enterprise.findFirst({ where: { id } });
  }

  async updateEnterprise(
    id: number,
    enterprise: CreateEnterpriseDto,
  ): Promise<Enterprise> {
    return await this.prisma.enterprise.update({
      where: { id },
      data: {
        name: enterprise.name,
      },
    });
  }

  async deleteEnterprise(id: number): Promise<boolean> {
    return await this.prisma.enterprise
      .delete({ where: { id } })
      .then(() => true);
  }
}
