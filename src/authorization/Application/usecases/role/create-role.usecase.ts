import { RoleRepositoryPort } from '../../../Domain/repositories/role.repository.port';
import { CreateRoleDto } from '../../dto/role/create-role.dto';
import { Role } from '@prisma/client';
import { Inject } from '@nestjs/common';

export class CreateRoleUsecase {
  constructor(
    @Inject('RoleRepository')
    private readonly roleRepository: RoleRepositoryPort,
  ) {}

  async execute(role: CreateRoleDto): Promise<Role> {
    const createdRole = await this.roleRepository.createRole({
      name: role.name,
      status: true,
    });

    return createdRole;
  }
}
