// import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
// import { ParseIntPipe } from '@nestjs/common';

// import { IBaseResourceResolver } from '@/common/interfaces';
// import { IdType } from '@/common/types';
// import { AuthOutput } from '../auth/dto';
// import { User } from './entities';
// import { CreateUserInput, UpdateUserInput } from './dto';
// import { UserService } from './user.service';

// @Resolver(() => User)
// export class UserResolver
//   implements IBaseResourceResolver<User, CreateUserInput, UpdateUserInput>
// {
//   constructor(private readonly userService: UserService) {}

//   @Query(() => [User], { name: 'users' })
//   list() {
//     return this.userService.list();
//   }

//   @Query(() => User, { name: 'user' })
//   get(@Args('id', { type: () => ID }, ParseIntPipe) id: IdType) {
//     return this.userService.get(id);
//   }

//   @Mutation(() => AuthOutput, { name: 'createUser' })
//   create(@Args('data') data: CreateUserInput) {
//     return this.userService.create(data);
//   }

//   @Mutation(() => User, { name: 'updateUser' })
//   update(
//     @Args('id', { type: () => ID }, ParseIntPipe) id: IdType,
//     @Args('data') data: UpdateUserInput
//   ) {
//     return this.userService.update(id, data);
//   }

//   @Mutation(() => User, { name: 'deleteUser' })
//   delete(@Args('id', { type: () => ID }, ParseIntPipe) id: IdType) {
//     return this.userService.delete(id);
//   }
// }
