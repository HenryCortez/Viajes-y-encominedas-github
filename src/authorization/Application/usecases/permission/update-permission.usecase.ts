import { Inject } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionRepositoryPort } from 'src/authorization/Domain/repositories/permission.repository.port';
import { CreatePermissionDto } from '../../dto/permission/create-permission.dto';

export class UpdatePermissionUseCase {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepositoryPort,
  ) {}

  async execute(
    id: number,
    permission: Partial<CreatePermissionDto>,
  ): Promise<Permission> {
    return this.permissionRepository.updatePermission(id, permission);
  }
}
