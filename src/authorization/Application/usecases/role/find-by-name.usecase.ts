import { Inject } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleRepositoryPort } from '../../../Domain/repositories/role.repository.port';

export class FindByNameUsecase {
  constructor(
    @Inject('RoleRepository') private roleRepository: RoleRepositoryPort,
  ) {}

  async execute(name: string): Promise<Role> {
    return await this.roleRepository.findByName(name);
  }
}
