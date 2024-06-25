import { Inject } from '@nestjs/common';
import { DriverRepositoryPort } from '../../Domain/repositories/driver.repository.port';

export class DeleteDriverUsecase {
  constructor(
    @Inject('DriverRepository')
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(id: number): Promise<boolean> {
    const deletedDriver = await this.driverRepository.deleteDriver(id);

    return deletedDriver;
  }
}
