import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from 'src/User/Domain/repositories/user.repository.port';
import { CreateUserDto } from 'src/User/Application/dto/create-user.dto';

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
