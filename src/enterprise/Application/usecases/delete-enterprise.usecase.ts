import { Inject } from '@nestjs/common';
import { EnterpriseRepositoryPort } from 'src/enterprise/Domain/repositories/enterprise.repository.port';

export class DeleteEnterpriseUsecase {
  constructor(
    @Inject('EnterpriseRepository')
    private readonly enterpriseRepository: EnterpriseRepositoryPort,
  ) {}

  async execute(id: number): Promise<boolean> {
    return this.enterpriseRepository.deleteEnterprise(id);
  }
}
