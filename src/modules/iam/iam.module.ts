import { Module } from '@nestjs/common';

import { AuthModule, UserModule } from '.';

@Module({
  imports: [AuthModule, UserModule],
})
export class IamModule {}
