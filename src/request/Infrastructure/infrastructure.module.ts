import { Module } from '@nestjs/common';
import { RequestApplicationModule } from '../Application/application.module';
import { CommonModule } from 'src/common/common.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { RequestRepositoryAdapter } from './repositories/request.repository.adapter';
import { RequestController } from './controllers/request.controller';

@Module({
  imports: [RequestApplicationModule, CommonModule, AuthorizationModule],
  providers: [RequestRepositoryAdapter],
  controllers: [RequestController],
  exports: [RequestRepositoryAdapter],
})
export class RequestInfrastructureModule {}
