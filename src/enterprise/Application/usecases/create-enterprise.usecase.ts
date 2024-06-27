import { Inject } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../../Domain/repositories/enterprise.repository.port';
import { CreateEnterpriseDto } from 'src/enterprise/Application/dtos/create-enterprise.dto';
import { Enterprise } from '@prisma/client';

export class CreateEnterpriseUsecase {
  constructor(
    @Inject('EnterpriseRepository')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async execute(enterprise: CreateEnterpriseDto): Promise<Enterprise> {
    return this.enterpriseRepository.createEnterprise(enterprise);
  }
}
