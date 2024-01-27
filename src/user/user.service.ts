import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { IUpdateUserParams, IUserResponse } from './interfaces';
import { PrismaService } from 'nestjs-prisma';
import { selectUser } from '/common/helpers';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  // Mutation
  async create(data: Prisma.UserCreateInput): Promise<IUserResponse> {
    const user = await this.prismaService.user.create({ data });
    delete user.password, delete user.refreshToken;
    return user;
  }

  async update(params: IUpdateUserParams): Promise<IUserResponse | null> {
    const { where, data } = params;
    return this.prismaService.user.update({ where, data });
  }

  async delete(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<IUserResponse | null> {
    return this.prismaService.user.delete({ where });
  }

  // Query
  async list(): Promise<IUserResponse[]> {
    return this.prismaService.user.findMany({ select: selectUser });
  }

  async get(where: Prisma.UserWhereUniqueInput): Promise<IUserResponse | null> {
    return this.prismaService.user.findUnique({ where, select: selectUser });
  }
}
