import { Module } from '@nestjs/common';
import { RouteApplicationModule } from '../Application/application.module';
import { CommonModule } from '../../common/common.module';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { RouteController } from './controllers/route.controller';
import { RouteRepostoryAdapter } from './repositories/route.repository.adapter';

@Module({
  imports: [RouteApplicationModule, CommonModule, AuthorizationModule],
  controllers: [RouteController],
  providers: [RouteRepostoryAdapter],
})
export class RouteInfrastructureModule {}
