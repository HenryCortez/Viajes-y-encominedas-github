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
import { Role as PrismaRole } from '@prisma/client';
import {
  AssignUserRoleUsecase,
  GetUserRolesUsecase,
  RemoveUserRoleUsecase,
} from 'src/authorization/Application/usecases';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { CreateUserRoleDto } from 'src/authorization/Application/dto/user-role/create-user-role.dto';

@ApiTags('Roles-Usuarios')
@Controller('user-roles/')
export class UserRoleController {
  constructor(
    private readonly assignUserRoleUsecase: AssignUserRoleUsecase,
    private readonly removeUserRoleUsecase: RemoveUserRoleUsecase,
    private readonly getUserRolesUsecase: GetUserRolesUsecase,
  ) {}

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Listar Roles por Usuario',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuario.',
  })
  async getUserRoles(
    @Res() request,
    @Param('email') email: string,
  ): Promise<string[]> {
    const roles: string[] = await this.getUserRolesUsecase.execute(email);
    return request.status(HttpStatus.OK).json(roles);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Asignar un rol a un usuario',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuario.',
  })
  async assignUserRole(
    @Res() request,
    @Body() userRole: CreateUserRoleDto,
  ): Promise<PrismaRole> {
    const createdRole = await this.assignUserRoleUsecase.execute(
      userRole.userId,
      userRole.roleId,
    );
    return request.status(HttpStatus.OK).json(createdRole);
  }

  @Delete(':userId/:roleId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Eliminar un rol de un usuario',
    description:
      'Este endpoint es accesible por los roles: todo tipo de usuario.',
  })
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
