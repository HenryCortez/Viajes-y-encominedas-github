import { Inject, Injectable } from '@nestjs/common';
import { AuthRepositoryPort } from '../../Domain/repositories/auth.repository.port';
import { LogUserDto } from '../../Application/dto/log-user.dto';

@Injectable()
export class LogUserUseCase {
  constructor(
    @Inject('AuthRepository') private authRepository: AuthRepositoryPort,
  ) {}

  async execute(logUserDto: LogUserDto): Promise<any> {
    const userLogged = await this.authRepository.logUser(logUserDto);
    return userLogged;
  }
}
