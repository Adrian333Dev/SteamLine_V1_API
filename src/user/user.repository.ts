import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { IGettableNonNullable, ICRUD } from '/common/generics';
import {
  ICreateUserParams,
  IDeleteUserParams,
  IGetUserParams,
  IListUserParams,
  IUpdateUserParams,
} from './interfaces';

@Injectable()
export class UserRepository implements ICRUD<User>, IGettableNonNullable<User> {
  constructor(private prisma: PrismaService) {}

  async create(params: ICreateUserParams): Promise<User> {
    const { data } = params;
    return this.prisma.user.create({ data });
  }

  async update(params: IUpdateUserParams): Promise<User | null> {
    const { where, data } = params;
    return this.prisma.user.update({ data, where });
  }

  async delete(params: IDeleteUserParams): Promise<User | null> {
    const { where } = params;
    return this.prisma.user.delete({ where });
  }

  // Query
  async list(params: IListUserParams): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async get(params: IGetUserParams): Promise<User | null> {
    const { where } = params;
    return this.prisma.user.findUnique({ where });
  }

  // Additional

  /**
   * Find zero or one User that matches the filter.
   * @param {UserFindUniqueArgs} args - Arguments to find a User
   **/
  async findUniqueOrThrow(params: IGetUserParams): Promise<User> {
    const { where } = params;
    return this.prisma.user.findUniqueOrThrow({ where });
  }
}
