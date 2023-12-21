import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma';
import { User } from '@prisma/client';

import { CreateUserInput, UpdateUserInput } from './user.inputs';
import { IBaseResourceService } from '@/common/interfaces';

@Injectable()
export class UserService
  implements IBaseResourceService<User, CreateUserInput, UpdateUserInput>
{
  constructor(private readonly prismaService: PrismaService) {}

  list() {
    return this.prismaService.user.findMany();
  }

  get(id: number) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  create(data: CreateUserInput) {
    return this.prismaService.user.create({ data });
  }

  update(id: number, data: UpdateUserInput) {
    return this.prismaService.user.update({ where: { id }, data });
  }

  delete(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
