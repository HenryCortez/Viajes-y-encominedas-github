import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ApplicationUserModule } from '../Application/application.module';
import { UserController } from './controllers/user.controller';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthorizationModule } from '../../authorization/authorization.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [ApplicationUserModule, AuthorizationModule, CommonModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class InfrastructureUserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/users/register', method: RequestMethod.POST }
        , { path: '/users/password', method: RequestMethod.PATCH }
      );
  }
}
