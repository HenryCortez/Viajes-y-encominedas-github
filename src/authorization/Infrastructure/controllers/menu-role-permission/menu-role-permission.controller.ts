import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { MenuRolePermission } from '@prisma/client';
import {
  AssignMenuRolePermissionUseCase,
  GetMenuRolePermissionsUseCase,
  RemoveMenuRolePermissionUsecase,
} from '../../../Application/usecases';

@Controller('menu-role-permission/')
export class MenuRolePermissionController {
  constructor(
    private readonly assignMenuRolePermissionUsecase: AssignMenuRolePermissionUseCase,
    private readonly removeMenuRolePermissionUsecase: RemoveMenuRolePermissionUsecase,
    private readonly getMenuRolePermissionsUsecase: GetMenuRolePermissionsUseCase,
  ) {}

  @Get(':menuRoleId')
  async getMenuRolePermissions(
    @Res() response,
    menuRoleId: number,
  ): Promise<string[]> {
    const permissions =
      await this.getMenuRolePermissionsUsecase.execute(menuRoleId);
    return response.status(HttpStatus.OK).json(permissions);
  }

  @Post('/create')
  async assignMenuRolePermission(
    @Res() response,
    @Body('menuRoleId', ParseIntPipe) menuRoleId: number,
    @Body('permissionId', ParseIntPipe) permissionId: number,
  ): Promise<MenuRolePermission> {
    const createdMenuRolePermission =
      await this.assignMenuRolePermissionUsecase.execute(
        menuRoleId,
        permissionId,
      );
    return response.status(HttpStatus.CREATED).json(createdMenuRolePermission);
  }

  @Delete(':menuRoleId/:permissionId')
  async removeMenuRolePermission(
    @Res() response,
    @Param('menuRoleId', ParseIntPipe) menuRoleId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number,
  ): Promise<boolean> {
    const removed = await this.removeMenuRolePermissionUsecase.execute(
      menuRoleId,
      permissionId,
    );
    return response.status(HttpStatus.OK).json(removed);
  }
}
