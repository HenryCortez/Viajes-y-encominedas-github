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
import { Role } from '@prisma/client';
import {
  AssignUserRoleUsecase,
  GetUserRolesUsecase,
  RemoveUserRoleUsecase,
} from 'src/authorization/Application/usecases';

@Controller('user-roles/')
export class UserRoleController {
  constructor(
    private readonly assignUserRoleUsecase: AssignUserRoleUsecase,
    private readonly removeUserRoleUsecase: RemoveUserRoleUsecase,
    private readonly getUserRolesUsecase: GetUserRolesUsecase,
  ) {}

  @Get(':id')
  async getUserRoles(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<string[]> {
    const roles: string[] = await this.getUserRolesUsecase.execute(id);
    return request.status(HttpStatus.OK).json(roles);
  }

  @Post('/create')
  async assignUserRole(
    @Res() request,
    @Body('userId', ParseIntPipe) userId: number,
    @Body('roleId', ParseIntPipe) roleId: number,
  ): Promise<Role> {
    const createdRole = await this.assignUserRoleUsecase.execute(
      userId,
      roleId,
    );
    return request.status(HttpStatus.OK).json(createdRole);
  }

  @Delete(':userId/:roleId')
  async removeUserRole(
    @Res() request,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ): Promise<boolean> {
    const removedFlag: boolean = await this.removeUserRoleUsecase.execute(
      userId,
      roleId,
    );
    return request.status(HttpStatus.OK).json(removedFlag);
  }
}
