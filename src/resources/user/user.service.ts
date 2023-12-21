import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/modules/prisma";
import { CreateUserInput, UpdateUserInput } from "./dto";

@Injectable()
export class UserService {
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
