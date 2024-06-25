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
import { Role } from '@prisma/client';
import { CreateRoleDto } from 'src/authorization/Application/dto/role/create-role.dto';
import { UpdateRoleDto } from 'src/authorization/Application/dto/role/update-role.dto';
import {
  CreateRoleUsecase,
  DeleteRoleUsecase,
  FindRoleByNameUsecase,
  ListRolesUsecase,
  UpdateRoleUsecase,
} from 'src/authorization/Application/usecases';

@Controller('roles/')
export class RoleController {
  constructor(
    private readonly createRoleUseCase: CreateRoleUsecase,
    private readonly deleteRoleUsecase: DeleteRoleUsecase,
    private readonly listRolesUsecase: ListRolesUsecase,
    private readonly findByNameRoleUsecase: FindRoleByNameUsecase,
    private readonly updateRoleUsecase: UpdateRoleUsecase,
  ) {}

  @Get()
  async listRoles(@Res() request): Promise<Role[]> {
    const roles = await this.listRolesUsecase.execute();
    return request.status(HttpStatus.OK).json(roles);
  }

  @Get('/role/:name')
  async findByName(@Res() request, @Param('name') name: string): Promise<Role> {
    const role = await this.findByNameRoleUsecase.execute(name);
    return request.status(HttpStatus.OK).json(role);
  }

  @Post('/create')
  async createRole(@Res() request, @Body() role: CreateRoleDto): Promise<Role> {
    const createdRole = await this.createRoleUseCase.execute(role);
    return request.status(HttpStatus.OK).json(createdRole);
  }

  @Put(':id')
  async updateRole(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() role: UpdateRoleDto,
  ): Promise<Role> {
    const updatedRole = await this.updateRoleUsecase.execute(id, role);
    return request.status(HttpStatus.OK).json(updatedRole);
  }

  @Delete(':id')
  async deleteRole(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<boolean> {
    const deletedFlag: boolean = await this.deleteRoleUsecase.execute(id);
    return request.status(HttpStatus.OK).json(deletedFlag);
  }
}
