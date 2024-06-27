import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role as PrismaRole } from '@prisma/client';
import { CreateRoleDto } from 'src/authorization/Application/dto/role/create-role.dto';
import { UpdateRoleDto } from 'src/authorization/Application/dto/role/update-role.dto';
import {
  CreateRoleUsecase,
  DeleteRoleUsecase,
  FindRoleByNameUsecase,
  ListRolesUsecase,
  UpdateRoleUsecase,
} from 'src/authorization/Application/usecases';
import { Role } from '../../decorators/authorization.decorator';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { AuthorizationGuard } from '../../guards/authorization.guard';

@ApiTags('Roles')
@ApiBearerAuth()
@Controller('roles/')
@Role('admin')
@UseGuards(AuthGuard, AuthorizationGuard)
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUsecase,
    private readonly deleteRoleUsecase: DeleteRoleUsecase,
    private readonly listRolesUsecase: ListRolesUsecase,
    private readonly findByNameRoleUsecase: FindRoleByNameUsecase,
    private readonly updateRoleUsecase: UpdateRoleUsecase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Roles',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async listRoles(@Res() request): Promise<PrismaRole[]> {
    const roles = await this.listRolesUsecase.execute();
    return request.status(HttpStatus.OK).json(roles);
  }

  @Get('/role/:name')
  @ApiOperation({
    summary: 'Buscar Rol por Nombre',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async findByName(
    @Res() request,
    @Param('name') name: string,
  ): Promise<PrismaRole> {
    const role = await this.findByNameRoleUsecase.execute(name);
    return request.status(HttpStatus.OK).json(role);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear Rol',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async createRole(
    @Res() request,
    @Body() role: CreateRoleDto,
  ): Promise<PrismaRole> {
    const createdRole = await this.createRoleUseCase.execute(role);
    return request.status(HttpStatus.OK).json(createdRole);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar Rol',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async updateRole(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleDto,
  ): Promise<PrismaRole> {
    const updatedRole = await this.updateRoleUsecase.execute(id, role);
    return request.status(HttpStatus.OK).json(updatedRole);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar Rol',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async deleteRole(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    const deletedFlag: boolean = await this.deleteRoleUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedFlag);
  }
}
