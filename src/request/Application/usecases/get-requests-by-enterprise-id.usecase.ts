import { Inject } from '@nestjs/common';
import { Request } from '@prisma/client';
import { RequestRepositoryPort } from 'src/request/Domain/repositories/request.repository.port';

export class GetRequestsByEntrerpriseIdUsecase {
  constructor(
    @Inject('RequestRepository')
    private readonly requestRepository: RequestRepositoryPort,
  ) {}

  execute(request: any): Promise<Request[]> {
    return this.requestRepository.getRequestsByEnterpriseId(request);
  }
}
