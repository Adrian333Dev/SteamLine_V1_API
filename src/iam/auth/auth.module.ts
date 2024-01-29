import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenGuard, authGuardProvider } from './guards';
import { jwtConfig } from '../config';

@Module({
  providers: [authGuardProvider, AccessTokenGuard],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
})
export class AuthModule {}
