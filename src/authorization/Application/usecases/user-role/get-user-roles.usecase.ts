import { Inject } from '@nestjs/common';
import { UserRoleRepositoryPort } from 'src/authorization/Domain/repositories/user-role.repository.port';

export class GetUserRolesUsecase {
  constructor(
    @Inject('UserRoleRepository')
    private userRoleRepository: UserRoleRepositoryPort,
  ) {}

  async execute(userId: number): Promise<string[]> {
    return await this.userRoleRepository.getUserRoles(userId);
  }
}
