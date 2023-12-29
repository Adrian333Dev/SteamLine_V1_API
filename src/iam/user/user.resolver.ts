import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './entities';
import { CreateUserInput, UpdateUserInput } from './dto';
import { IBaseResourceResolver } from '@/common/interfaces';
import { AuthOutput } from '@/common/dto';

@Resolver(() => User)
export class UserResolver
  implements IBaseResourceResolver<User, CreateUserInput, UpdateUserInput>
{
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  list() {
    return this.userService.list();
  }

  @Query(() => User, { name: 'user' })
  get(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.userService.get(id);
  }

  @Mutation(() => AuthOutput, { name: 'createUser' })
  create(@Args('data') data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Mutation(() => User, { name: 'updateUser' })
  update(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: UpdateUserInput
  ) {
    return this.userService.update(id, data);
  }

  @Mutation(() => User, { name: 'deleteUser' })
  delete(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
