import { Inject } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../../Domain/repositories/enterprise.repository.port';
import { Enterprise } from '@prisma/client';

export class ListEnterprisesUsecase {
  constructor(
    @Inject('EnterpriseRepository')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async execute(): Promise<Enterprise[]> {
    return this.enterpriseRepository.listEnterprises();
  }
}
