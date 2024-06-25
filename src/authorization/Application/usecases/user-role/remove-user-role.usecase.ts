import { Inject } from '@nestjs/common';
import { UserRoleRepositoryPort } from '../../../Domain/repositories/user-role.repository.port';

export class RemoveUserRoleUsecase {
  constructor(
    @Inject('UserRoleRepository')
    private userRoleRepository: UserRoleRepositoryPort,
  ) {}

  async execute(userId: number, roleId: number): Promise<boolean> {
    return await this.userRoleRepository.removeUserRole(userId, roleId);
  }
}
