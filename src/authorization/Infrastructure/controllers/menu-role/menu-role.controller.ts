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
import { MenuRole } from '@prisma/client';
import {
  AssignMenuRoleUseCase,
  GetMenuRolesUseCase,
  RemoveMenuRoleUseCase,
} from '../../../Application/usecases';

@Controller('menu-role/')
export class MenuRoleController {
  constructor(
    private readonly assignMenuRoleUsecase: AssignMenuRoleUseCase,
    private readonly removeMenuRoleUsecase: RemoveMenuRoleUseCase,
    private readonly getMenuRolesUsecase: GetMenuRolesUseCase,
  ) {}

  @Get(':roleId')
  async getRoleMenus(
    @Res() response,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<string[]> {
    const menus = await this.getMenuRolesUsecase.execute(roleId);

    return response.status(HttpStatus.OK).json(menus);
  }

  @Post('/create')
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
  async removeMenuRole(
    @Res() response,
    @Param('menuId') menuId: number,
    @Param('roleId') roleId: number,
  ): Promise<boolean> {
    const removed = await this.removeMenuRoleUsecase.execute(menuId, roleId);

    return response.status(HttpStatus.OK).json(removed);
  }
}
