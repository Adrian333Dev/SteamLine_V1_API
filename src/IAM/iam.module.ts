import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { HashingService, BcryptService } from './hashing';
import { CommonModule } from '/common';
import { jwtConfig } from './config';
import {
  AuthenticationService,
  AuthenticationController,
} from './authentication';
import { UserRepository } from '/user/user.repository';

@Module({
  providers: [
    { provide: HashingService, useClass: BcryptService },
    UserRepository,
    AuthenticationService,
  ],
  imports: [
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    CommonModule,
  ],
  controllers: [AuthenticationController],
})
export class IdentityAccessManagementModule {}
