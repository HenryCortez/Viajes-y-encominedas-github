import { Inject } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleRepositoryPort } from '../../../Domain/repositories/role.repository.port';

export class ListRolesUsecase {
  constructor(
    @Inject('RoleRepository') private roleRepository: RoleRepositoryPort,
  ) {}

  async execute(): Promise<Role[]> {
    return await this.roleRepository.listRoles();
  }
}
