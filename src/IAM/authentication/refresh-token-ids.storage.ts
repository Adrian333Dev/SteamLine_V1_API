import { Injectable } from '@nestjs/common';
import { UserRepository } from '/user/user.repository';

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(private readonly userRepo: UserRepository) {}
  // TODO: implement this for muti device login
}
