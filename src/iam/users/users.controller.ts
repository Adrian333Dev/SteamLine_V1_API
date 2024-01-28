import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './user.dtos';
import { UsersService } from './users.service';
import { PaginationQueryDto } from '/framework/dto';
@Controller('iam/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.usersService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Delete()
  deleteAll() {
    return this.usersService.deleteAll();
  }
}
