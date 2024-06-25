import { Injectable } from '@nestjs/common';
import { Menu, PrismaClient } from '@prisma/client';
import { CreateMenuDto } from 'src/authorization/Application/dto/menu/create-menu.dto';
import { UpdateMenuDto } from 'src/authorization/Application/dto/menu/update-menu.dto';
import { MenuRepositoryPort } from 'src/authorization/Domain/repositories/menu.repository.port';

@Injectable()
export class PrismaMenuRepositoryAdapter implements MenuRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async createMenu(menu: CreateMenuDto): Promise<Menu> {
    return await this.prisma.menu.create({
      data: {
        name: menu.name,
        parentId: menu.parentId,
      },
    });
  }

  async listMenus(): Promise<Menu[]> {
    return await this.prisma.menu.findMany();
  }

  async updateMenu(id: number, menu: Partial<UpdateMenuDto>): Promise<Menu> {
    if (id !== null) {
      return this.prisma.menu.update({
        where: {
          id,
        },
        data: {
          name: menu.name,
          parentId: menu.parentId,
        },
      });
    }
  }

  async deleteMenu(menuId: number): Promise<boolean> {
    if (menuId !== undefined) {
      await this.prisma.menu.update({
        where: { id: menuId },
        data: { status: false },
      });
    }
    return true;
  }

  async findByName(name: string): Promise<Menu> {
    if (name !== undefined) {
      return await this.prisma.menu.findFirst({
        where: {
          name,
        },
      });
    }
  }
}
