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
} from '@nestjs/common';
import { Permission } from '@prisma/client';
import { CreatePermissionDto } from 'src/authorization/Application/dto/permission/create-permission.dto';
import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  ListPermissionsUseCase,
  UpdatePermissionUseCase,
} from 'src/authorization/Application/usecases';

@Controller('permissions/')
export class PermissionController {
  constructor(
    private readonly createPermissionUsecase: CreatePermissionUseCase,
    private readonly deletePermissionUsecase: DeletePermissionUseCase,
    private readonly listPermissionsUsecase: ListPermissionsUseCase,
    private readonly updatePermissionUsecase: UpdatePermissionUseCase,
  ) {}

  @Get()
  async listPermissions(@Res() request): Promise<Permission[]> {
    const permissions: Permission[] =
      await this.listPermissionsUsecase.execute();
    return request.status(HttpStatus.OK).json(permissions);
  }

  @Post('/create')
  async createPermission(
    @Res() request,
    @Body() permission: CreatePermissionDto,
  ): Promise<Permission> {
    const createdPermission: Permission =
      await this.createPermissionUsecase.execute(permission);
    return request.status(HttpStatus.CREATED).json(createdPermission);
  }

  @Put(':id')
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
  async deletePermission(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    const deletedPermission: boolean =
      await this.deletePermissionUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedPermission);
  }
}
