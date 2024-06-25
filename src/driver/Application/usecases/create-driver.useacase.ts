import { Inject } from '@nestjs/common';
import { DriverRepositoryPort } from '../../Domain/repositories/driver.repository.port';
import { CreateDriverDto } from '../dtos/create-driver.dto';

export class CreateDriverUsecase {
  constructor(
    @Inject('DriverRepository')
    private readonly driverRepository: DriverRepositoryPort,
  ) {}

  async execute(
    fileName: string,
    file: Buffer,
    driver: CreateDriverDto,
  ): Promise<any> {
    const createdDriver = await this.driverRepository.createDriver(
      fileName,
      file,
      {
        user_id: Number(driver.userId),
      },
    );

    return createdDriver;
  }
}
