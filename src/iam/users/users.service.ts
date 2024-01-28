import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CrudService } from '/framework';
import { HashingService } from '../hashing';
import { User } from './users.schema';
import { CreateUserDto } from './user.dtos';

@Injectable()
export class UsersService extends CrudService<User> {
  constructor(
    @InjectModel(User.name) userModel: Model<User>,
    private readonly hashingService: HashingService,
  ) {
    super(userModel);
  }

  override async create({ password, ...dto }: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashingService.hash(password);
    return super.create({ ...dto, password: hashedPassword });
  }

  async deleteAll(): Promise<void> {
    await this.model.deleteMany({});
  }
}
