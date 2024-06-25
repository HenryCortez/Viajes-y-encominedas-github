import { Injectable } from '@nestjs/common';
import { MenuRolePermission, PrismaClient } from '@prisma/client';
import { MenuRolePermissionRepositoryPort } from '../../../Domain/repositories/menu-role-permission.repository.port';

@Injectable()
export class PrismaMenuRolePermissionRepositoryAdapter
  implements MenuRolePermissionRepositoryPort
{
  constructor(private readonly prisma: PrismaClient) {}

  async assignMenuRolePermission(
    menuRoleId: number,
    permissionId: number,
  ): Promise<MenuRolePermission> {
    return await this.prisma.menuRolePermission.create({
      data: {
        menuRoleId,
        permissionId,
      },
    });
  }

  async removeMenuRolePermission(
    menuRoleId: number,
    permissionId: number,
  ): Promise<boolean> {
    const menuRolePermission = await this.prisma.menuRolePermission.findFirst({
      where: {
        menuRoleId,
        permissionId,
      },
    });

    if (!menuRolePermission) {
      return false;
    }

    await this.prisma.menuRolePermission.update({
      where: {
        id: menuRolePermission.id,
      },
      data: {
        status: false,
      },
    });

    return true;
  }

  async getMenuRolePermissions(menuRoleId: number): Promise<string[]> {
    const menuRolePermissions = await this.prisma.menuRolePermission.findMany({
      where: {
        menuRoleId,
      },
      select: {
        permission: {
          select: {
            name: true,
          },
        },
      },
    });

    return menuRolePermissions.map((menuRolePermission) => {
      return menuRolePermission.permission.name;
    });
  }
}
