import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { IUpdateUserParams, IUserResponse } from './interfaces';
import { ActiveUser } from '/iam/decorators';
import { ID } from '/common/types';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() params: Prisma.UserCreateInput): Promise<IUserResponse> {
    return this.userService.create(params);
  }

  @Get('list')
  async list(): Promise<IUserResponse[]> {
    return this.userService.list();
  }

  @Get('get/:id')
  async get(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IUserResponse | null> {
    return this.userService.get({ id });
  }

  @Get('me')
  async getProfile(@ActiveUser('sub') id: ID): Promise<IUserResponse | null> {
    return this.userService.get({ id });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<IUserResponse | null> {
    return this.userService.update({ where: { id }, data });
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IUserResponse | null> {
    return this.userService.delete({ id });
  }
}
