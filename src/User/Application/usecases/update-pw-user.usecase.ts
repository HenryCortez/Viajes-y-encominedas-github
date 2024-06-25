import { Inject, Injectable } from "@nestjs/common";
import { UserRepositoryPort } from "src/user/Domain/repositories/user.repository.port";
import { CreateUserDto } from "../dto/create-user.dto";

@Injectable()
export class UpdatePasswordUserUseCase {
  constructor(
    @Inject('UserRepository') private userRepository: UserRepositoryPort,
  ) {}

  async execute(token: string, user: Partial<CreateUserDto>): Promise<any> {
    const createdUser = await this.userRepository.updatePassword(token, user);
    return createdUser;
  }
}
