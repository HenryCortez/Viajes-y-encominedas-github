import { Inject } from '@nestjs/common';
import { PermissionRepositoryPort } from '../../../Domain/repositories/permission.repository.port';

export class DeletePermissionUseCase {
  constructor(
    @Inject('PermissionRepository')
    private readonly permissionRepository: PermissionRepositoryPort,
  ) {}

  async execute(permissionId: number): Promise<boolean> {
    return this.permissionRepository.deletePermission(permissionId);
  }
}
