import { Module } from '@nestjs/common';

import { OrganizationModule } from './organization/organization.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UserModule, OrganizationModule, AuthModule],
})
export class IamModule {}
