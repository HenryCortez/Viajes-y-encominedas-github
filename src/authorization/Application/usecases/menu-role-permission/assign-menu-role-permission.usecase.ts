import { Inject } from '@nestjs/common';
import { MenuRolePermission } from '@prisma/client';
import { MenuRolePermissionRepositoryPort } from '../../../Domain/repositories/menu-role-permission.repository.port';

export class AssignMenuRolePermissionUseCase {
  constructor(
    @Inject('MenuRolePermissionRepository')
    private readonly menuRolePermissionRepository: MenuRolePermissionRepositoryPort,
  ) {}

  async execute(
    menuRoleId: number,
    permissionId: number,
  ): Promise<MenuRolePermission> {
    return await this.menuRolePermissionRepository.assignMenuRolePermission(
      menuRoleId,
      permissionId,
    );
  }
}
