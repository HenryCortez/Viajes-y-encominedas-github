import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthRepositoryPort } from '../../Domain/repositories/auth.repository.port';
import { LogUserDto } from '../../Application/dto/log-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepositoryPort } from '../../../user/Domain/repositories/user.repository.port';

@Injectable()
export class PrismaAuthRepositoryAdapter implements AuthRepositoryPort {
  constructor(
    private prisma: PrismaClient,
    private jwtService: JwtService,
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async validateUser(logUserDto: LogUserDto): Promise<any> {
    const user = await this.userRepository.findByEmail(logUserDto.email);
    console.log(user);

    if (
      user &&
      (await bcrypt.compare(logUserDto.password, user.passwordHash))
    ) {
      const { passwordHash, passwordSalt, ...result } = user;
      return result;
    }
    return null;
  }

  async logUser(logUserDto: LogUserDto): Promise<any> {
    var validate = await this.validateUser(logUserDto);
    console.log(validate);

    if (!validate) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: logUserDto.email };

    var token = this.jwtService.sign(payload);

    return {
      access_token: token,
    };
  }
}
