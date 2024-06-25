import { Inject } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { UserRoleRepositoryPort } from 'src/authorization/Domain/repositories/user-role.repository.port';

export class AssignUserRoleUsecase {
  constructor(
    @Inject('UserRoleRepository')
    private userRoleRepository: UserRoleRepositoryPort,
  ) {}

  async execute(userId: number, roleId: number): Promise<UserRole> {
    return await this.userRoleRepository.assignUserRole(userId, roleId);
  }
}
