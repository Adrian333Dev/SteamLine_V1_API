import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserRepository } from './user.repository';
import { ICRUDService } from '/common/generics';

@Injectable()
export class UserService extends ICRUDService<User> {
  constructor(protected readonly repository: UserRepository) {
    super(repository);
  }
}
