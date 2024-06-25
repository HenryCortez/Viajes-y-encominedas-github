import { Module } from '@nestjs/common';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { CommonModule } from 'src/common/common.module';
import { EnterpriseApplicationModule } from '../Application/application.module';
import { EnterpriseRepositoryAdapter } from './repositories/enterprise.repository.adapter';
import { EnterpriseController } from './controllers/enterprise.controller';

@Module({
  imports: [EnterpriseApplicationModule, AuthorizationModule, CommonModule],
  controllers: [EnterpriseController],
  providers: [EnterpriseRepositoryAdapter],
})
export class EnterpriseInfrastructureModule {}
