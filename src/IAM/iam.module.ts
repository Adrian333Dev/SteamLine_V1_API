import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { hashingServiceProvider } from './hashing';
import { jwtConfig } from './config';
import { UserRepository } from '/user/user.repository';
import {
  AuthenticationService,
  AuthenticationController,
  RefreshTokenIdsStorage,
} from './authentication';
import { AccessTokenGuard, authGuardProvider } from './authentication/guards';

@Module({
  providers: [
    hashingServiceProvider,
    UserRepository,
    AuthenticationService,
    RefreshTokenIdsStorage,
    AccessTokenGuard,
    authGuardProvider,
  ],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  controllers: [AuthenticationController],
})
export class IdentityAccessManagementModule {}
