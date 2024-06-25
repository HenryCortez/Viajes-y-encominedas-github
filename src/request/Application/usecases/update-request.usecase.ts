import { Inject } from '@nestjs/common';
import { RequestRepositoryPort } from '../../Domain/repositories/request.repository.port';
import { UpdateRequestDto } from '../dtos/update-request.dto';
import { Request } from '@prisma/client';

export class UpdateRequestUsecase {
  constructor(
    @Inject('RequestRepository')
    private readonly requestRepository: RequestRepositoryPort,
  ) {}

  execute(requestId: number, request: UpdateRequestDto): Promise<Request> {
    return this.requestRepository.updateRequest(requestId, request);
  }
}
