import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenGuard, authGuardProvider } from './guards';
import { jwtConfig } from '../config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users';
import { hashingServiceProvider } from '../hashing';

@Module({
  providers: [
    authGuardProvider,
    AccessTokenGuard,
    AuthService,
    hashingServiceProvider,
  ],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    UsersModule,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
