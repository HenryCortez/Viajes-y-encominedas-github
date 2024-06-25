import { Inject } from '@nestjs/common';
import { Driver } from '@prisma/client';
import { DriverRepositoryPort } from 'src/driver/Domain/repositories/driver.repository.port';

export class ListDriversUsecase {
  constructor(
    @Inject('DriverRepository')
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(): Promise<Driver[]> {
    const drivers = await this.driverRepository.listDrivers();

    return drivers;
  }
}
