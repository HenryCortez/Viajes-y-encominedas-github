import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../../Application/dto/create-user.dto';
import { UserRepositoryPort } from '../../Domain/repositories/user.repository.port';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(token: string, user: Partial<CreateUserDto>): Promise<any> {
    const createdUser = await this.userRepository.updateUser(token, user);
    return createdUser;
  }
}
