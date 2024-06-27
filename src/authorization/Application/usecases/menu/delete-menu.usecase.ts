import { Inject } from '@nestjs/common';
import { MenuRepositoryPort } from 'src/authorization/Domain/repositories/menu.repository.port';

export class DeleteMenuUsecase {
  constructor(
    @Inject('MenuRepository') private menuRepository: MenuRepositoryPort,
  ) {}

  async execute(menuId: number): Promise<boolean> {
    return await this.menuRepository.deleteMenu(menuId);
  }
}
