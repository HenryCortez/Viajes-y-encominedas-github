import { Role } from '@prisma/client';

export interface RoleRepositoryPort {
  createRole(role: Omit<Role, 'id'>): Promise<Role>;
  listRoles(): Promise<Role[]>;
  updateRole(id: number, role: Partial<Role>): Promise<Role>;
  deleteRole(roleId: number): Promise<boolean>;
  findByName(name: string): Promise<Role>;
}
