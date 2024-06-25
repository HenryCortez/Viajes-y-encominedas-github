import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRoleRepositoryAdapter } from '../repositories/user-role/prisma.user-role.repository.adapter';
import { ROLES_KEY } from '../decorators/authorization.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    @Inject('UserRoleRepository')
    private readonly UserRoleRepository: PrismaUserRoleRepositoryAdapter,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('Acceso No Autorizado');
    }

    const decodedToken = this.jwtService.decode(token);

    if (!decodedToken) {
      throw new ForbiddenException('Acceso No Autorizado');
    }

    const userId = decodedToken.sub;

    const userRoles = await this.UserRoleRepository.getUserRolesObjects(userId);

    const hasRequiredRole = userRoles.some((role) =>
      requiredRoles.includes(role.name),
    );

    if (!hasRequiredRole) {
      throw new ForbiddenException('No authorization for the user roles');
    }

    return true;
  }
}
