import { Module } from '@nestjs/common';
import { ApplicationAuthorizationModule } from '../Application/application.module';
import { RoleController } from './controllers/role/role.controller';
import { UserRoleController } from './controllers/user-role/user-role.controller';
import { MenuController } from './controllers/menu/menu.controller';
import { PermissionController } from './controllers/permission/permission.controller';
import { MenuRoleController } from './controllers/menu-role/menu-role.controller';
import { MenuRolePermissionController } from './controllers/menu-role-permission/menu-role-permission.controller';
import { CommonModule } from '../../common/common.module';


@Module({
  imports: [ApplicationAuthorizationModule, CommonModule],
  controllers: [
    RoleController,
    UserRoleController,
    MenuController,
    PermissionController,
    MenuRoleController,
    MenuRolePermissionController,
  ],
  exports: [ApplicationAuthorizationModule],
})
export class InfrastructureAuthorizationModule {}
