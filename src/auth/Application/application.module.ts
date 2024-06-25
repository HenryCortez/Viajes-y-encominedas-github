import { Module } from '@nestjs/common';
import { CommonModule } from '../../common/common.module';
import { LogUserUseCase } from './usecases/log-user.usecase';

import { PrismaAuthRepositoryAdapter } from '../Infraestructure/repositories/prisma.auth.repository.adapter';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [],
  providers: [
    LogUserUseCase,

    {
      provide: 'AuthRepository',
      useClass: PrismaAuthRepositoryAdapter,
    },
  ],
  exports: [LogUserUseCase],
})
export class ApplicationAuthModule {}
