import { Module } from '@nestjs/common';
import { RouteApplicationModule } from '../Application/application.module';
import { CommonModule } from 'src/common/common.module';
import { AuthorizationModule } from 'src/authorization/authorization.module';
import { RouteController } from './controllers/route.controller';
import { RouteRepostoryAdapter } from './repositories/route.repository.adapter';

@Module({
  imports: [RouteApplicationModule, CommonModule, AuthorizationModule],
  controllers: [RouteController],
  providers: [RouteRepostoryAdapter],
})
export class RouteInfrastructureModule {}
