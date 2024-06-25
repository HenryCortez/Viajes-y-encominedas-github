import { Inject } from '@nestjs/common';
import { EnterpriseRepositoryPort } from '../../Domain/repositories/enterprise.repository.port';
import { Enterprise } from '@prisma/client';

export class GetEnterpriseByIdUsecase {
  constructor(
    @Inject('EnterpriseRepository')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async execute(id: number): Promise<Enterprise> {
    return this.enterpriseRepository.getEnterpriseById(id);
  }
}
