import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './types/user.dtos';
import { UsersService } from './users.service';
import { PaginationQueryDto } from '/framework/dto';
import { HashingService } from '../hashing';
@Controller('iam/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  @Post()
  async create(@Body() { password, ...dto }: CreateUserDto) {
    const hashedPassword = await this.hashingService.hash(password);
    return this.usersService.create({ ...dto, password: hashedPassword });
  }

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
