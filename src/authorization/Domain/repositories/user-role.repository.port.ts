import { Role, UserRole } from '@prisma/client';

export interface UserRoleRepositoryPort {
  assignUserRole(userId: number, roleId: number): Promise<UserRole>;
  removeUserRole(userId: number, roleId: number): Promise<boolean>;
  getUserRoles(userEmail: string): Promise<string[]>;
  getUserRolesObjects(userEmail: String): Promise<Role[]>;
}
