import { RoleRepositoryPort } from 'src/authorization/Domain/repositories/role.repository.port';
import { UpdateRoleDto } from '../../dto/role/update-role.dto';
import { Role } from '@prisma/client';
import { Inject } from '@nestjs/common';

export class UpdateRoleUsecase {
  constructor(
    @Inject('RoleRepository') private roleRepository: RoleRepositoryPort,
  ) {}

  async execute(id: number, role: Partial<UpdateRoleDto>): Promise<Role> {
    const updatedRole = await this.roleRepository.updateRole(id, {
      ...role,
    });

    return updatedRole;
  }
}
