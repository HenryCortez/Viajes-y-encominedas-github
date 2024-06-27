import { Injectable } from '@nestjs/common';
import { Permission, PrismaClient } from '@prisma/client';
import { CreatePermissionDto } from 'src/authorization/Application/dto/permission/create-permission.dto';
import { PermissionRepositoryPort } from 'src/authorization/Domain/repositories/permission.repository.port';

@Injectable()
export class PrismaPermissionRepositoryAdapter
  implements PermissionRepositoryPort
{
  constructor(private readonly prisma: PrismaClient) {}

  async createPermission(permission: CreatePermissionDto): Promise<Permission> {
    return await this.prisma.permission.create({
      data: {
        name: permission.name,
      },
    });
  }

  async listPermissions(): Promise<Permission[]> {
    return this.prisma.permission.findMany();
  }

  async updatePermission(
    id: number,
    permission: Partial<CreatePermissionDto>,
  ): Promise<Permission> {
    if (id !== undefined) {
      return await this.prisma.permission.update({
        where: { id },
        data: permission,
      });
    }
  }

  async deletePermission(permissionId: number): Promise<boolean> {
    if (permissionId !== undefined) {
      await this.prisma.permission.delete({
        where: {
          id: permissionId,
        },
      });
      return true;
    }
  }
}
