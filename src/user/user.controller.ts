import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ICRUD } from '/common/generics';
import { User } from '@prisma/client';
import {
  ICreateUserParams,
  IUpdateUserParams,
  IDeleteUserParams,
  IListUserParams,
} from './interfaces';

@Controller('user')
export class UserController implements ICRUD<User> {
  constructor(private readonly userService: UserService) {}

  // Mutation
  @Post()
  async create(params: ICreateUserParams): Promise<User> {
    return this.userService.create(params);
  }

  @Patch()
  async update(params: IUpdateUserParams): Promise<User | null> {
    return this.userService.update(params);
  }

  @Delete()
  async delete(params: IDeleteUserParams): Promise<User | null> {
    return this.userService.delete(params);
  }

  // Query
  @Get()
  async list(params: IListUserParams): Promise<User[]> {
    return this.userService.list(params);
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.get({ where: { id } });
  }
}
