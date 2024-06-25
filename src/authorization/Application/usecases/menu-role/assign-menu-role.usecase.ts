import { Inject } from '@nestjs/common';
import { MenuRole } from '@prisma/client';
import { MenuRoleRepositoryPort } from 'src/authorization/Domain/repositories/menu-role.repository.port';

export class AssignMenuRoleUseCase {
  constructor(
    @Inject('MenuRoleRepository')
    private readonly menuRoleRepository: MenuRoleRepositoryPort,
  ) {}

  async execute(menuId: number, roleId: number): Promise<MenuRole> {
    return this.menuRoleRepository.assignMenuRole(menuId, roleId);
  }
}
