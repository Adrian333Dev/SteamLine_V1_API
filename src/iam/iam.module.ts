import { Module } from '@nestjs/common';

import { UsersModule } from './users';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [],
  imports: [UsersModule, AuthModule],
  controllers: [],
})
export class IAMModule {}
