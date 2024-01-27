import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { hashingServiceProvider } from './hashing';
import { jwtConfig } from './config';
import {
  AuthenticationService,
  AuthenticationController,
  RefreshTokenIdsStorage,
} from './authentication';
import { AccessTokenGuard, authGuardProvider } from './authentication/guards';

@Module({
  providers: [
    hashingServiceProvider,
    authGuardProvider,
    AuthenticationService,
    RefreshTokenIdsStorage,
    AccessTokenGuard,
  ],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
})
export class IdentityAccessManagementModule {}
