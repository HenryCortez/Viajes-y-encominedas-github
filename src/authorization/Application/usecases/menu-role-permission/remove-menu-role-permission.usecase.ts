import { Inject } from '@nestjs/common';
import { MenuRolePermissionRepositoryPort } from 'src/authorization/Domain/repositories/menu-role-permission.repository.port';

export class RemoveMenuRolePermissionUsecase {
  constructor(
    @Inject('MenuRolePermissionRepository')
    private readonly menuRolePermissionRepository: MenuRolePermissionRepositoryPort,
  ) {}

  async execute(menuRoleId: number, permissionId: number): Promise<boolean> {
    return await this.menuRolePermissionRepository.removeMenuRolePermission(
      menuRoleId,
      permissionId,
    );
  }
}
