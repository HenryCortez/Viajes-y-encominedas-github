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
  Headers,
  Request,
  Patch,
  Req,
} from '@nestjs/common';

import { CreateUserUseCase } from 'src/User/Application/usecases/create-user.usecase';
import { DeleteUserUseCase } from 'src/User/Application/usecases/delete-user.usecase';
import { ListUserUseCase } from 'src/User/Application/usecases/list-user.usecase';
import { UpdateUserUseCase } from 'src/User/Application/usecases/update-user.usecase';
import { CreateUserDto } from '../../Application/dto/create-user.dto';
import { UpdateUserDto } from '../../Application/dto/update-user.dto';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { UpdatePasswordUserUseCase } from 'src/User/Application/usecases/update-pw-user.usecase';
import { UpdateEnterpriseUserUseCase } from 'src/User/Application/usecases/update-enterprise-user.usecase';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('users/')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private listUserUseCase: ListUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private updatePasswordUserUseCase: UpdatePasswordUserUseCase,
    private updateUserEnterpriseUseCase: UpdateEnterpriseUserUseCase,
  ) {}

  @Post('/register')
  @ApiOperation({
    summary: 'Crear Usuario',
    description: 'Este endpoint es accesible por los roles: cualquier usuario.',
  })
  async createUser(@Res() request, @Body() user: CreateUserDto): Promise<any> {
    const userCreated = await this.createUserUseCase.execute(user);
    return request.status(HttpStatus.CREATED).json(userCreated);
  }

  @Role('admin')
  @UseGuards(AuthorizationGuard)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Listar Usuarios',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async listUsers(@Res() request): Promise<any> {
    const users = await this.listUserUseCase.execute();
    return request.status(HttpStatus.OK).json(users);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/profile')
  @ApiOperation({
    summary: 'Actualizar Usuario',
    description: 'Este endpoint es accesible por los roles: cualquier usuario.',
  })
  async updateUser(
    @Req() request,
    @Res() response,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    const jwt = request.user.email;
    const userUpdated = await this.updateUserUseCase.execute(jwt, user);
    return response.status(HttpStatus.OK).json(userUpdated);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/password')
  @ApiOperation({
    summary: 'Actualizar Contraseña',
    description: 'Este endpoint es accesible por los roles: cualquier usuario.',
  })
  async updatePassword(
    @Req() request,
    @Res() response,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    const jwt = request.user.email;
    console.log(jwt);
    const userUpdated = await this.updatePasswordUserUseCase.execute(jwt, user);
    return response.status(HttpStatus.OK).json(userUpdated);
  }

  @ApiBearerAuth()
  @Role('admin')
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar Usuario',
    description: 'Este endpoint es accesible por los roles: admin.',
  })
  async deleteUser(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    await this.deleteUserUseCase.execute(id);
    return request.status(HttpStatus.NO_CONTENT).json();
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Patch('/enterprise/:id')
  @ApiOperation({
    summary: 'Actualizar Empresa de Usuario',
    description: 'Este endpoint es accesible por los roles: cualquier usuario.',
  })
  async updateUserEnterprise(
    @Res() response,
    @Body('enterpriseId') enterpriseId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const userUpdated = await this.updateUserEnterpriseUseCase.execute(
      id,
      enterpriseId,
    );
    return response.status(HttpStatus.OK).json(userUpdated);
  }
}
