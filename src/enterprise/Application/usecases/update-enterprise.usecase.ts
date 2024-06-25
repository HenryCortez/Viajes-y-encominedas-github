import { Inject } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../../Domain/repositories/enterprise.repository.port';
import { Enterprise } from '@prisma/client';
import { CreateEnterpriseDto } from '../../Application/dtos/create-enterprise.dto';

export class UpdateEnterpriseUsecase {
  constructor(
    @Inject('EnterpriseRepository')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async execute(
    id: number,
    enterprise: CreateEnterpriseDto,
  ): Promise<Enterprise> {
    return this.enterpriseRepository.updateEnterprise(id, enterprise);
  }
}
