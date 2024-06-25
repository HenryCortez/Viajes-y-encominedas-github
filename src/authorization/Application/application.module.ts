import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import * as Usecases from './usecases/index';
import { PrismaRoleRepositoryAdapter } from '../Infrastructure/repositories/role/prisma.role.respository.adapter';
import { PrismaUserRoleRepositoryAdapter } from '../Infrastructure/repositories/user-role/prisma.user-role.repository.adapter';
import { PrismaMenuRepositoryAdapter } from '../Infrastructure/repositories/menu/prisma.menu.repository.adapter';
import { PrismaPermissionRepositoryAdapter } from '../Infrastructure/repositories/permission/prisma.permission.repository.adapter';
import { PrismaMenuRoleRepositoryAdapter } from '../Infrastructure/repositories/menu-role/prisma.menu-role.repository.adapter';
import { PrismaMenuRolePermissionRepositoryAdapter } from '../Infrastructure/repositories/menu-role-permission/prisma.menu-role-permission.repository.adapter';

@Module({
  imports: [CommonModule],
  providers: [
    ...Object.values(Usecases),
    {
      provide: 'RoleRepository',
      useClass: PrismaRoleRepositoryAdapter,
    },
    {
      provide: 'UserRoleRepository',
      useClass: PrismaUserRoleRepositoryAdapter,
    },
    {
      provide: 'MenuRepository',
      useClass: PrismaMenuRepositoryAdapter,
    },
    {
      provide: 'PermissionRepository',
      useClass: PrismaPermissionRepositoryAdapter,
    },
    {
      provide: 'MenuRoleRepository',
      useClass: PrismaMenuRoleRepositoryAdapter,
    },
    {
      provide: 'MenuRolePermissionRepository',
      useClass: PrismaMenuRolePermissionRepositoryAdapter,
    },
  ],
  exports: [
    ...Object.values(Usecases),
    'RoleRepository',
    'UserRoleRepository',
    'MenuRepository',
    'PermissionRepository',
    'MenuRoleRepository',
    'MenuRolePermissionRepository',
  ],
})
export class ApplicationAuthorizationModule {}
