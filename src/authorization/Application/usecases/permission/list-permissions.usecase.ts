import { Inject } from '@nestjs/common';
import { Permission } from '@prisma/client';
import { PermissionRepositoryPort } from 'src/authorization/Domain/repositories/permission.repository.port';

export class ListPermissionsUseCase {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepositoryPort,
  ) {}

  async execute(): Promise<Permission[]> {
    return this.permissionRepository.listPermissions();
  }
}
