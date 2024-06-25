import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LogUserDto } from '../../Application/dto/log-user.dto';
import { LogUserUseCase } from '../../Application/usecases/log-user.usecase';
import {
  GetMenuRolesUseCase,
  GetUserRolesUsecase,
  GetUserRolesUsecaseObjects,
} from '../../../authorization/Application/usecases';

@Controller('/auth')
export class AuthController {
  constructor(
    private logUserUseCase: LogUserUseCase,
    private readonly getUserRolesUsecase: GetUserRolesUsecase,
    private readonly getUserRolesUsecaseObjects: GetUserRolesUsecaseObjects,
    private readonly getRoleMenusUsecase: GetMenuRolesUseCase,
  ) {}

  @Post('/login')
  async logUser(@Res() request, @Body() logUserDto: LogUserDto): Promise<any> {
    const userLogged = await this.logUserUseCase.execute(logUserDto);
    const roles: string[] = await this.getUserRolesUsecase.execute(
      userLogged.id,
    );

    const rolesObjects = await this.getUserRolesUsecaseObjects.execute(
      userLogged.id,
    );

    const menus = await Promise.all(
      rolesObjects.map(async (role) => {
        return await this.getRoleMenusUsecase.execute(role.id);
      }),
    );

    return request.status(HttpStatus.CREATED).json({
      user: userLogged,
      roles: roles,
      menus: menus.flat(),
    });
  }
}
