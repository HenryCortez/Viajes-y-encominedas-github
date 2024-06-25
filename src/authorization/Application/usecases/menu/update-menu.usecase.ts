import { Menu } from '@prisma/client';
import { MenuRepositoryPort } from '../../../Domain/repositories/menu.repository.port';
import { UpdateMenuDto } from '../../dto/menu/update-menu.dto';
import { Inject } from '@nestjs/common';

export class UpdateMenuUsecase {
  constructor(
    @Inject('MenuRepository') private menuRepository: MenuRepositoryPort,
  ) {}

  async execute(id: number, menu: Partial<UpdateMenuDto>): Promise<Menu> {
    return await this.menuRepository.updateMenu(id, menu);
  }
}
