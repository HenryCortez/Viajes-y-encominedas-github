import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LogUserDto } from '../../Application/dto/log-user.dto';
import { LogUserUseCase } from 'src/auth/Application/usecases/log-user.usecase';
import {
  GetMenuRolesUseCase,
  GetUserRolesUsecase,
  GetUserRolesUsecaseObjects,
} from 'src/authorization/Application/usecases';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Autenticación')
@Controller('/auth')
export class AuthController {
  constructor(
    private logUserUseCase: LogUserUseCase,
    private readonly getUserRolesUsecase: GetUserRolesUsecase,
    private readonly getUserRolesUsecaseObjects: GetUserRolesUsecaseObjects,
    private readonly getRoleMenusUsecase: GetMenuRolesUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  @ApiOperation({
    summary: 'Iniciar Sesión',
    description: 'Este endpoint es accesible por los roles: cualquier usuario.',
  })
  async logUser(@Res() request, @Body() logUserDto: LogUserDto): Promise<any> {
    const userLogged: { access_token: string } =
      await this.logUserUseCase.execute(logUserDto);

    const decodedToken = this.jwtService.decode(userLogged.access_token);
    const email = decodedToken.email;

    const roles: string[] = await this.getUserRolesUsecase.execute(
      email,
    );

    const rolesObjects = await this.getUserRolesUsecaseObjects.execute(email);

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
