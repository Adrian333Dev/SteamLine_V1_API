import { Resolver, Query, Mutation, Args, ID } from "@nestjs/graphql";
import { ParseIntPipe } from "@nestjs/common";

import { Resource } from "@/common/interfaces";
import { User } from "./entities";
import { UserService } from "./user.service";
import { CreateUserInput, UpdateUserInput } from "./dto";

@Resolver(() => User)
export class UserResolver implements Resource<User> {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: "users" })
  list() {
    return this.userService.list();
  }

  @Query(() => User, { name: "user" })
  get(@Args("id", { type: () => ID }, ParseIntPipe) id: number) {
    return this.userService.get(id);
  }

  @Mutation(() => User)
  create(@Args("data") data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Mutation(() => User)
  update(
    @Args("id", { type: () => ID }, ParseIntPipe) id: number,
    @Args("data") data: UpdateUserInput,
  ) {
    return this.userService.update(id, data);
  }

  @Mutation(() => User)
  delete(@Args("id", { type: () => ID }, ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
