import { Inject } from '@nestjs/common';
import { MenuRoleRepositoryPort } from '../../../Domain/repositories/menu-role.repository.port';

export class GetMenuRolesUseCase {
  constructor(
    @Inject('MenuRoleRepository')
    private readonly menuRoleRepository: MenuRoleRepositoryPort,
  ) {}

  async execute(roleId: number): Promise<string[]> {
    return this.menuRoleRepository.getRoleMenus(roleId);
  }
}
