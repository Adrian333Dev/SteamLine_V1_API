import { Module } from '@nestjs/common';

import { UsersModule } from './users';

@Module({
  providers: [],
  imports: [UsersModule],
  controllers: [],
})
export class IAMModule {}
