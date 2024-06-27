import { Inject } from '@nestjs/common';
import { MenuRolePermissionRepositoryPort } from 'src/authorization/Domain/repositories/menu-role-permission.repository.port';

export class GetMenuRolePermissionsUseCase {
  constructor(
    @Inject('MenuRolePermissionRepository')
    private readonly menuRolePermissionRepository: MenuRolePermissionRepositoryPort,
  ) {}

  async execute(menuRoleId: number): Promise<string[]> {
    return this.menuRolePermissionRepository.getMenuRolePermissions(menuRoleId);
  }
}
