import { MenuRole } from '@prisma/client';

export interface MenuRoleRepositoryPort {
  assignMenuRole(menuId: number, roleId: number): Promise<MenuRole>;
  removeMenuRole(menuId: number, roleId: number): Promise<boolean>;
  getRoleMenus(roleId: number): Promise<string[]>;
}
