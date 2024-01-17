import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { IdentityAccessManagementModule } from '/iam';
import { CommonModule } from '/common';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    IdentityAccessManagementModule,
  ],
})
export class AppModule {}
