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
import { Permission } from '@prisma/client';
import { CreatePermissionDto } from 'src/authorization/Application/dto/permission/create-permission.dto';
import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  ListPermissionsUseCase,
  UpdatePermissionUseCase,
} from 'src/authorization/Application/usecases';
import { AuthorizationGuard } from '../../guards/authorization.guard';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { Role } from '../../decorators/authorization.decorator';

@ApiTags('Permisos')
@ApiBearerAuth()
@Controller('permissions/')
@Role('admin')
@UseGuards(AuthGuard, AuthorizationGuard)
export class PermissionController {
  constructor(
    private readonly createPermissionUsecase: CreatePermissionUseCase,
    private readonly deletePermissionUsecase: DeletePermissionUseCase,
    private readonly listPermissionsUsecase: ListPermissionsUseCase,
    private readonly updatePermissionUsecase: UpdatePermissionUseCase,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Listar Permisos',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async listPermissions(@Res() request): Promise<Permission[]> {
    const permissions: Permission[] =
      await this.listPermissionsUsecase.execute();
    return request.status(HttpStatus.OK).json(permissions);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear Permiso',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async createPermission(
    @Res() request,
    @Body() permission: CreatePermissionDto,
  ): Promise<Permission> {
    const createdPermission: Permission =
      await this.createPermissionUsecase.execute(permission);
    return request.status(HttpStatus.CREATED).json(createdPermission);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar Permiso',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async updatePermission(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() permission: CreatePermissionDto,
  ): Promise<Permission> {
    const updatedPermission: Permission =
      await this.updatePermissionUsecase.execute(id, permission);
    return request.status(HttpStatus.OK).json(updatedPermission);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar Permiso',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async deletePermission(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    const deletedPermission: boolean =
      await this.deletePermissionUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedPermission);
  }
}
