import { CreateUserDto } from '../../Application/dto/create-user.dto';

export interface UserRepositoryPort {
  createUser(user: CreateUserDto): Promise<any>;
  listUsers(): Promise<any[]>;
  updateUser(token: string, user: Partial<CreateUserDto>): Promise<any>;
  deleteUser(userId: number): Promise<boolean>;
  findByEmail(email: string): Promise<any>;
  updatePassword(token: string, user: Partial<CreateUserDto>): Promise<any>;
  updateEnterprise(userId: number, enterpriseId: number): Promise<any>;
}
