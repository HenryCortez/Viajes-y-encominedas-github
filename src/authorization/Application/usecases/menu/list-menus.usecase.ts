import { Inject } from '@nestjs/common';
import { Menu } from '@prisma/client';
import { MenuRepositoryPort } from 'src/authorization/Domain/repositories/menu.repository.port';

export class ListMenusUsecase {
  constructor(
    @Inject('MenuRepository') private menuRepository: MenuRepositoryPort,
  ) {}

  async execute(): Promise<Menu[]> {
    return await this.menuRepository.listMenus();
  }
}
