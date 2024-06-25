import { Permission } from '@prisma/client';

export interface PermissionRepositoryPort {
  createPermission(permission: Omit<Permission, 'id'>): Promise<Permission>;
  listPermissions(): Promise<Permission[]>;
  updatePermission(
    id: number,
    permission: Partial<Permission>,
  ): Promise<Permission>;
  deletePermission(permissionId: number): Promise<boolean>;
}
