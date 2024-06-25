import { HttpException, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { UserRepositoryPort } from 'src/user/Domain/repositories/user.repository.port';
import { CreateUserDto } from '../../Application/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/Application/dto/update-user.dto';


@Injectable()
export class PrismaUserRepositoryAdapter implements UserRepositoryPort {
  constructor(
    private prisma: PrismaClient,
   
  ) {}

  async updatePassword(
    token: string,
    user: Partial<CreateUserDto>,
  ): Promise<any> {

    const userToUpdate = await this.findByEmail(token);

    if (!userToUpdate) {
      throw new Error('User not found');
    }

    return this.prisma.user.update({
      where: { id: userToUpdate.id },
      data: {
        passwordHash: user.passwordHash,
        passwordSalt: user.passwordSalt,
      },
    });
  }
  async updateEnterprise(userId: number, enterpriseId: number): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async findByEmail(email: string): Promise<any> {
    return await this.prisma.user.findUnique({
      where: { email: email },
    });
  }
  async createUser(user: CreateUserDto): Promise<any> {
    try {
      return await this.prisma.user.create({
        data: {
          name: user.name.toLowerCase(),
          surname: user.surname.toLowerCase(),
          email: user.email.toLowerCase(),
          passwordHash: user.passwordHash,
          passwordSalt: user.passwordSalt,
        },
      });
    } catch (error) {
      console.log(error);
      
      throw new HttpException('Error creating user, already exists', 500);
    }

  }

  async listUsers(): Promise<any[]> {
    return await this.prisma.user.findMany();
  }

  async updateUser(token: string, user: UpdateUserDto): Promise<any> {
    const userToUpdate = await this.findByEmail(token);

    if (!userToUpdate) {
      throw new Error('User not found');
    }
    if (user.name !== undefined) user.name = user.name.toLowerCase();
    if (user.surname !== undefined) user.surname = user.surname.toLowerCase();
    if (user.email !== undefined) user.email = user.email.toLowerCase();
    return await this.prisma.user.update({
      where: { id: userToUpdate.id },
      data: user,
    });
  }
  async deleteUser(userId: number): Promise<boolean> {
    try {
      await this.prisma.user.update({
        where: { id: userId },
        data: { status: false },
      });
      return true;
    } catch (error) {
      throw new HttpException('Error deleting user', 500);
      console.error(error);
      return false;
    }
  }
}
