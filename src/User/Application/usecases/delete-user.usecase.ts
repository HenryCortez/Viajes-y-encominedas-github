import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '../../Domain/repositories/user.repository.port';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(userId: number): Promise<boolean> {
    const deletedUser = await this.userRepository.deleteUser(userId);
    return deletedUser;
  }
}
