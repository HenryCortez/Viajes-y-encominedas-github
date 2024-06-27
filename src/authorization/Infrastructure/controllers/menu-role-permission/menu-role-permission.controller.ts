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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MenuRolePermission } from '@prisma/client';
import {
  AssignMenuRolePermissionUseCase,
  GetMenuRolePermissionsUseCase,
  RemoveMenuRolePermissionUsecase,
} from 'src/authorization/Application/usecases';
import { Role } from '../../decorators/authorization.decorator';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { AuthorizationGuard } from '../../guards/authorization.guard';

@ApiTags('Menu-Rol-Permisos')
@ApiBearerAuth()
@Controller('menu-role-permission/')
@Role('admin')
@UseGuards(AuthGuard, AuthorizationGuard)
export class MenuRolePermissionController {
  constructor(
    private readonly assignMenuRolePermissionUsecase: AssignMenuRolePermissionUseCase,
    private readonly removeMenuRolePermissionUsecase: RemoveMenuRolePermissionUsecase,
    private readonly getMenuRolePermissionsUsecase: GetMenuRolePermissionsUseCase,
  ) {}

  @Get(':menuRoleId')
  @ApiOperation({
    summary: 'Listar Permisos por Rol de Menu',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async getMenuRolePermissions(
    @Res() response,
    menuRoleId: number,
  ): Promise<string[]> {
    const permissions =
      await this.getMenuRolePermissionsUsecase.execute(menuRoleId);
    return response.status(HttpStatus.OK).json(permissions);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Asignar un permiso a un rol de menu',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
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
  @ApiOperation({
    summary: 'Eliminar un permiso de un rol de menu',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
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
