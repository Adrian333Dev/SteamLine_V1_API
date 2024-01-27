import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import { IdentityAccessManagementModule } from '/iam';
import { UserModule } from './user';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    PrismaModule.forRoot({ isGlobal: true }),
    IdentityAccessManagementModule,
    UserModule,
  ],
})
export class AppModule {}
