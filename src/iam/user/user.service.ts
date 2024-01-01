import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/modules/prisma';
import { User } from '@prisma/client';

import { CreateUserInput, UpdateUserInput } from './dto';
import { IBaseResourceService } from '@/common/interfaces';

@Injectable()
export class UserService
  implements IBaseResourceService<User, CreateUserInput, UpdateUserInput>
{
  constructor(private readonly prismaService: PrismaService) {}

  list() {
    return this.prismaService.user.findMany();
  }

  get(id: string) {
    return this.prismaService.user.findUniqueOrThrow({ where: { id } });
  }

  create(data: CreateUserInput) {
    return this.prismaService.user.create({ data });
  }

  update(id: string, data: UpdateUserInput) {
    return this.prismaService.user.update({ where: { id }, data });
  }

  delete(id: string) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
