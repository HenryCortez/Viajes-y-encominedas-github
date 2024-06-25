import { Inject } from '@nestjs/common';
import { PermissionRepositoryPort } from '../../../Domain/repositories/permission.repository.port';
import { CreatePermissionDto } from '../../dto/permission/create-permission.dto';
import { Permission } from '@prisma/client';

export class CreatePermissionUseCase {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepositoryPort,
  ) {}
  async execute(permission: CreatePermissionDto): Promise<Permission> {
    return this.permissionRepository.createPermission({
      name: permission.name,
    });
  }
}
