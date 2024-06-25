import { Inject } from '@nestjs/common';
import { DriverRepositoryPort } from 'src/driver/Domain/repositories/driver.repository.port';
import { Driver } from '@prisma/client';
import { UpdateRequestEvent } from 'src/request/Infrastructure/events/update.request.event';

export class UpdateDriverUsecase {
  constructor(
    @Inject('DriverRepository')
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(payload: UpdateRequestEvent): Promise<Driver> {
    const updatedDriver = await this.driverRepository.updateDriver(payload);

    return updatedDriver;
  }
}
