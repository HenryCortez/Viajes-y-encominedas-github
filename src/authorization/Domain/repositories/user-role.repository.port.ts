import { Role, UserRole } from '@prisma/client';

export interface UserRoleRepositoryPort {
  assignUserRole(userId: number, roleId: number): Promise<UserRole>;
  removeUserRole(userId: number, roleId: number): Promise<boolean>;
  getUserRoles(userId: number): Promise<string[]>;
  getUserRolesObjects(userId: number): Promise<Role[]>;
}
