import { Menu } from '@prisma/client';
import { MenuRepositoryPort } from 'src/authorization/Domain/repositories/menu.repository.port';
import { CreateMenuDto } from '../../dto/menu/create-menu.dto';
import { Inject } from '@nestjs/common';

export class CreateMenuUsecase {
  constructor(
    @Inject('MenuRepository') private menuRepository: MenuRepositoryPort,
  ) {}

  async execute(menu: CreateMenuDto): Promise<Menu> {
    return await this.menuRepository.createMenu({
      name: menu.name,
      parentId: menu.parentId,
      status: true,
    });
  }
}
