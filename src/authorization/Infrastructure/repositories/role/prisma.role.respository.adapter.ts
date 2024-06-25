import { Injectable } from '@nestjs/common';
import { PrismaClient, Role } from '@prisma/client';
import { CreateRoleDto } from 'src/authorization/Application/dto/role/create-role.dto';
import { UpdateRoleDto } from 'src/authorization/Application/dto/role/update-role.dto';
import { RoleRepositoryPort } from 'src/authorization/Domain/repositories/role.repository.port';

@Injectable()
export class PrismaRoleRepositoryAdapter implements RoleRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async createRole(role: CreateRoleDto): Promise<Role> {
    return await this.prisma.role.create({
      data: {
        name: role.name,
      },
    });
  }

  async listRoles(): Promise<Role[]> {
    return await this.prisma.role.findMany();
  }

  async updateRole(id: number, role: Partial<UpdateRoleDto>): Promise<Role> {
    try {
      if (id !== undefined) {
        const searchedRole = await this.prisma.role.findFirst({
          where: { id: id },
        });

        if (searchedRole !== undefined) {
          return await this.prisma.role.update({
            where: { id: (await searchedRole).id },
            data: role,
          });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRole(roleId: number): Promise<boolean> {
    try {
      if (roleId !== undefined) {
        const searchedRole = await this.prisma.role.findFirst({
          where: { id: roleId },
        });

        if (searchedRole !== undefined) {
          await this.prisma.role.update({
            where: { id: searchedRole.id },
            data: { status: false },
          });
        }
      }

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findByName(name: string): Promise<Role> {
    try {
      if (name !== undefined) {
        return await this.prisma.role.findFirst({ where: { name: name } });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
