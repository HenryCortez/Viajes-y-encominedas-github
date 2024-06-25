import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { jwtConstants } from 'src/auth/Application/constants';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: PrismaClient,
      useValue: new PrismaClient(),
    },
  ],
  exports: [PrismaClient, JwtModule],
})
export class CommonModule {}
