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
import { MenuRole } from '@prisma/client';
import {
  AssignMenuRoleUseCase,
  GetMenuRolesUseCase,
  RemoveMenuRoleUseCase,
} from 'src/authorization/Application/usecases';
import { Role } from '../../decorators/authorization.decorator';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { AuthorizationGuard } from '../../guards/authorization.guard';

@ApiTags('Menu-Rol')
@ApiBearerAuth()
@Controller('menu-role/')
@Role('admin')
@UseGuards(AuthGuard, AuthorizationGuard)
export class MenuRoleController {
  constructor(
    private readonly assignMenuRoleUsecase: AssignMenuRoleUseCase,
    private readonly removeMenuRoleUsecase: RemoveMenuRoleUseCase,
    private readonly getMenuRolesUsecase: GetMenuRolesUseCase,
  ) {}

  @Get(':roleId')
  @ApiOperation({
    summary: 'Listar Menus por Rol',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async getRoleMenus(
    @Res() response,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<string[]> {
    const menus = await this.getMenuRolesUsecase.execute(roleId);

    return response.status(HttpStatus.OK).json(menus);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Asignar un menu a un rol',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async assignMenuRole(
    @Res() response,
    @Body() body: { menuId: number; roleId: number },
  ): Promise<MenuRole> {
    const createdMenuRole = await this.assignMenuRoleUsecase.execute(
      body.menuId,
      body.roleId,
    );

    return response.status(HttpStatus.CREATED).json(createdMenuRole);
  }

  @Delete(':menuId/:roleId')
  @ApiOperation({
    summary: 'Eliminar un menu de un rol',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async removeMenuRole(
    @Res() response,
    @Param('menuId') menuId: number,
    @Param('roleId') roleId: number,
  ): Promise<boolean> {
    const removed = await this.removeMenuRoleUsecase.execute(menuId, roleId);

    return response.status(HttpStatus.OK).json(removed);
  }
}
