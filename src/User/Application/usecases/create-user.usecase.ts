import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../Domain/repositories/user.repository.port';
import { CreateUserDto } from '../../Application/dto/create-user.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(user: CreateUserDto): Promise<any> {
    const updatedUser = await this.userRepository.createUser(user);
    return updatedUser;
  }
}
