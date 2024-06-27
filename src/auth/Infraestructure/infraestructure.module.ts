// src/Infrastructure/infrastructure.module.ts
import { Module } from '@nestjs/common';
import { ApplicationAuthModule } from '../Application/application.module';
import { AuthController } from './controllers/auth.controller';
import { CommonModule } from 'src/common/common.module'; // Importa el PrismaModule
import { ApplicationAuthorizationModule } from 'src/authorization/Application/application.module';

@Module({
  imports: [
    ApplicationAuthModule,
    CommonModule,
    ApplicationAuthorizationModule,
  ],
  controllers: [AuthController],
  providers: [],
  exports: [],
})
export class InfrastructureAuthModule {}
