import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'nestjs-prisma';

import { IdentityAccessManagementModule } from '/iam';
import { CommonModule } from '/common';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    PrismaModule.forRoot({ isGlobal: true }),
    CommonModule,
    IdentityAccessManagementModule,
  ],
})
export class AppModule {}
