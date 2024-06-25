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

import { CreateUserUseCase } from 'src/user/Application/usecases/create-user.usecase';
import { DeleteUserUseCase } from 'src/user/Application/usecases/delete-user.usecase';
import { ListUserUseCase } from 'src/user/Application/usecases/list-user.usecase';
import { UpdateUserUseCase } from 'src/user/Application/usecases/update-user.usecase';
import { CreateUserDto } from '../../Application/dto/create-user.dto';
import { UpdateUserDto } from '../../Application/dto/update-user.dto';
import { Role } from 'src/authorization/Infrastructure/decorators/authorization.decorator';
import { AuthorizationGuard } from 'src/authorization/Infrastructure/guards/authorization.guard';
import { AuthGuard } from 'src/auth/Infraestructure/guards/auth.guard';
import { UpdatePasswordUserUseCase } from 'src/user/Application/usecases/update-pw-user.usecase';

@Controller('users/')
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private deleteUserUseCase: DeleteUserUseCase,
    private listUserUseCase: ListUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private updatePasswordUserUseCase: UpdatePasswordUserUseCase,
  ) {}

  @Post('/register')
  async createUser(@Res() request, @Body() user: CreateUserDto): Promise<any> {
    const userCreated = await this.createUserUseCase.execute(user);
    return request.status(HttpStatus.CREATED).json(userCreated);
  }

  //@Role('admin')
  @UseGuards(AuthGuard, AuthorizationGuard)
  @Get()
  async listUsers(@Res() request): Promise<any> {
    const users = await this.listUserUseCase.execute();
    return request.status(HttpStatus.OK).json(users);
  }
  @UseGuards(AuthGuard)
  @Patch('/profile')
  async updateUser(
    @Req() request,
    @Res() response,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    const jwt = request.user.email;
    const userUpdated = await this.updateUserUseCase.execute(jwt, user);
    return response.status(HttpStatus.OK).json(userUpdated);
  }

  @UseGuards(AuthGuard)
  @Patch('/password')
  async updatePassword(
    @Req() request,
    @Res() response,
    @Body() user: UpdateUserDto,
  ): Promise<any> {
    // Remove 'Bearer ' from token
    const jwt = request.user.email;
    console.log(jwt);
     const userUpdated = await this.updatePasswordUserUseCase.execute(jwt, user);
    return response.status(HttpStatus.OK).json(userUpdated);
    //return response.status(HttpStatus.OK).json({ message: 'Debugging' });
  }

  @Delete(':id')
  async deleteUser(
    @Res() request,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<any> {
    await this.deleteUserUseCase.execute(id);
    return request.status(HttpStatus.NO_CONTENT).json();
  }
}
