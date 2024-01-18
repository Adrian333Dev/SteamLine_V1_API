import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { UserRepository } from './user.repository';

export interface IQueryable<T> {
  list(params: unknown): Promise<T[]>;
  get(params: unknown): Promise<T | null>;
}

export interface IMutationable<T> {
  create(params: unknown): Promise<T>;
  update(params: unknown): Promise<T>;
  delete(params: unknown): Promise<T>;
}

export interface ICRUD<T> extends IQueryable<T>, IMutationable<T> {}

@Injectable()
export class UserService implements ICRUD<User> {
  constructor(private readonly userRepository: UserRepository) {}

  // Mutation
  async create(params: { data: Prisma.UserCreateInput }): Promise<User> {
    const { data } = params;
    return this.userRepository.create({ data });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User | null> {
    const { where, data } = params;
    return this.userRepository.update({ where, data });
  }

  async delete(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User | null> {
    const { where } = params;
    return this.userRepository.delete({ where });
  }

  // Query
  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.userRepository.list({ skip, take, cursor, where, orderBy });
  }

  async get(params: {
    where: Prisma.UserWhereUniqueInput;
  }): Promise<User | null> {
    const { where } = params;
    return this.userRepository.get({ where });
  }
}
