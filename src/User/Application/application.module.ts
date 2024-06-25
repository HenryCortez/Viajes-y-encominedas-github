import { Module } from '@nestjs/common';
import { DeleteUserUseCase } from './usecases/delete-user.usecase';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { ListUserUseCase } from './usecases/list-user.usecase';
import { UpdateUserUseCase } from './usecases/update-user.usecase';
import { CommonModule } from '../../common/common.module';
import { PrismaUserRepositoryAdapter } from '../Infrastructure/repositories/prisma.user.repository.adapter';
import { UpdatePasswordUserUseCase } from './usecases/update-pw-user.usecase';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [
    CreateUserUseCase,
    DeleteUserUseCase,
    ListUserUseCase,
    UpdateUserUseCase,
    UpdatePasswordUserUseCase,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepositoryAdapter,
    },
  ],
  exports: [
    CreateUserUseCase,
    DeleteUserUseCase,
    ListUserUseCase,
    UpdateUserUseCase,
    UpdatePasswordUserUseCase,
    'UserRepository',
  ],
})
export class ApplicationUserModule {}
