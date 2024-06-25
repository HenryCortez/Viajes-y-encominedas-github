import { Module } from '@nestjs/common';
import { TravelApplicationModule } from '../Application/application.module';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { CommonModule } from '../../common/common.module';
import { TravelRepositoryAdapter } from './repositories/travel.repository.adapter';
import { TravelController } from './controllers/travel.controller';

@Module({
    imports: [TravelApplicationModule, AuthorizationModule, CommonModule],
  providers: [TravelRepositoryAdapter],
  controllers: [TravelController],
})
export class TravelInfrastructureModule {}
