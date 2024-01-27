import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import {
  IListUserParams,
  ICreateUserParams,
  IUpdateUserParams,
  IDeleteUserParams,
  IGetUserParams,
} from './interfaces';
import { ICRUD } from '/common/generics';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements ICRUD<User> {
  constructor(private readonly userRepository: UserRepository) {}

  // Mutation
  async create(params: ICreateUserParams): Promise<User> {
    const { data } = params;
    return this.userRepository.create({ data });
  }

  async update(params: IUpdateUserParams): Promise<User | null> {
    const { where, data } = params;
    return this.userRepository.update({ where, data });
  }

  async delete(params: IDeleteUserParams): Promise<User | null> {
    const { where } = params;
    return this.userRepository.delete({ where });
  }

  // Query
  async list(params: IListUserParams): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.userRepository.list({ skip, take, cursor, where, orderBy });
  }

  async get(params: IGetUserParams): Promise<User | null> {
    const { where } = params;
    return this.userRepository.get({ where });
  }
}
