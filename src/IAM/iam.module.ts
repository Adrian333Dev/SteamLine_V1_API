import { Module } from '@nestjs/common';
import { HashingService, BcryptService } from './hashing';
import { CommonModule } from '/common';
import { UserModule } from './user';

@Module({
  providers: [{ provide: HashingService, useClass: BcryptService }],
  imports: [CommonModule, UserModule],
})
export class IdentityAccessManagementModule {}
