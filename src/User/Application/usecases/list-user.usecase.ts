import { Inject, Injectable } from '@nestjs/common';

import { UserRepositoryPort } from '../../Domain/repositories/user.repository.port';

@Injectable()
export class ListUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(): Promise<any[]> {
    const listUsers = await this.userRepository.listUsers();
    return listUsers;
  }
}
