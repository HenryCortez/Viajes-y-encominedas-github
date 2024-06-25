import { Inject } from '@nestjs/common';
import { Role } from '@prisma/client';
import { UserRoleRepositoryPort } from 'src/authorization/Domain/repositories/user-role.repository.port';

export class GetUserRolesUsecaseObjects {
  constructor(
    @Inject('UserRoleRepository')
    private userRoleRepository: UserRoleRepositoryPort,
  ) {}

  async execute(userId: number): Promise<Role[]> {
    return await this.userRoleRepository.getUserRolesObjects(userId);
  }
}
