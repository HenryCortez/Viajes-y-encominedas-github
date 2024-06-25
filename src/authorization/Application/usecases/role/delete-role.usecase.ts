import { Inject } from '@nestjs/common';
import { RoleRepositoryPort } from 'src/authorization/Domain/repositories/role.repository.port';

export class DeleteRoleUsecase {
  constructor(
    @Inject('RoleRepository') private roleRepository: RoleRepositoryPort,
  ) {}

  async execute(id: number): Promise<boolean> {
    return await this.roleRepository.deleteRole(id);
  }
}
