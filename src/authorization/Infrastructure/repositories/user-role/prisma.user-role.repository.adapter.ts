import { Injectable } from '@nestjs/common';
import { PrismaClient, Role, UserRole } from '@prisma/client';
import { UserRoleRepositoryPort } from '../../../Domain/repositories/user-role.repository.port';

@Injectable()
export class PrismaUserRoleRepositoryAdapter implements UserRoleRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async assignUserRole(userId: number, roleId: number): Promise<UserRole> {
    return await this.prisma.userRole.create({
      data: {
        roleId: roleId,
        userId: userId,
      },
    });
  }
  async removeUserRole(userId: number, roleId: number): Promise<boolean> {
    try {
      if (userId !== undefined && roleId !== undefined) {
        const searchedUserRole = await this.prisma.userRole.findFirst({
          where: { userId: userId, roleId: roleId },
        });

        await this.prisma.userRole.update({
          where: { id: searchedUserRole.id },
          data: { status: false },
        });

        return true;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async getUserRoles(userId: number): Promise<string[]> {
    const roles = await this.prisma.userRole
      .findMany({
        where: { userId: userId, status: true },
        include: { role: true },
      })
      .then((userRoles) => userRoles.map((userRole) => userRole.role.name));

    return roles;
  }

  async getUserRolesObjects(userId: number): Promise<Role[]> {
    const roles = await this.prisma.userRole
      .findMany({
        where: { userId: userId, status: true },
        include: { role: true },
      })
      .then((userRoles) => userRoles.map((userRole) => userRole.role));

    return roles;
  }
}
