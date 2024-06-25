import { Injectable } from '@nestjs/common';
import { MenuRole, PrismaClient } from '@prisma/client';
import { MenuRoleRepositoryPort } from '../../../Domain/repositories/menu-role.repository.port';

@Injectable()
export class PrismaMenuRoleRepositoryAdapter implements MenuRoleRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async assignMenuRole(menuId: number, roleId: number): Promise<MenuRole> {
    return await this.prisma.menuRole.create({
      data: {
        menuId,
        roleId,
      },
    });
  }

  async removeMenuRole(menuId: number, roleId: number): Promise<boolean> {
    const searchedMenuRole = await this.prisma.menuRole.findFirst({
      where: { menuId, roleId },
    });

    await this.prisma.menuRole.update({
      where: { id: searchedMenuRole.id },
      data: { status: false },
    });

    return true;
  }

  async getRoleMenus(roleId: number): Promise<string[]> {
    const menus = await this.prisma.menuRole.findMany({
      where: { roleId, status: true },
      include: { menu: true },
    });

    return menus.map((menuRole) => menuRole.menu.name);
  }
}
