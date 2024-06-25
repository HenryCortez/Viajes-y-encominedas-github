import { Inject } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { MenuRepositoryPort } from 'src/authorization/Domain/repositories/menu.repository.port';

export class FindByNameUsecase {
  constructor(
    @Inject('MenuRepository') private menuRepository: MenuRepositoryPort,
  ) {}

  async execute(name: string): Promise<Menu> {
    return await this.menuRepository.findByName(name);
  }
}
