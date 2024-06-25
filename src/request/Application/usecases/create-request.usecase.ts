import { Inject } from '@nestjs/common';
import { Request } from '@prisma/client';
import { NewDriverEvent } from '../../../driver/Infrastructure/events/new.driver.event';
import { RequestRepositoryPort } from '../../Domain/repositories/request.repository.port';

export class CreateRequestUsecase {
  constructor(
    @Inject('RequestRepository')
    private readonly requestRepository: RequestRepositoryPort,
  ) {}

  execute(payload: NewDriverEvent): Promise<Request> {
    return this.requestRepository.createRequest(payload);
  }
}
