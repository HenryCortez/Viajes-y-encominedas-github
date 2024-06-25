import { MenuRolePermission } from '@prisma/client';

export interface MenuRolePermissionRepositoryPort {
  assignMenuRolePermission(
    menuRoleId: number,
    permissionId: number,
  ): Promise<MenuRolePermission>;
  removeMenuRolePermission(
    menuRoleId: number,
    permissionId: number,
  ): Promise<boolean>;
  getMenuRolePermissions(menuRoleId: number): Promise<string[]>;
}
