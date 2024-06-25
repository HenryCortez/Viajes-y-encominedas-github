import { Inject } from '@nestjs/common';
import { MenuRoleRepositoryPort } from 'src/authorization/Domain/repositories/menu-role.repository.port';

export class RemoveMenuRoleUseCase {
  constructor(
    @Inject('MenuRoleRepository')
    private readonly menuRoleRepository: MenuRoleRepositoryPort,
  ) {}

  async execute(menuId: number, roleId: number): Promise<boolean> {
    return this.menuRoleRepository.removeMenuRole(menuId, roleId);
  }
}
