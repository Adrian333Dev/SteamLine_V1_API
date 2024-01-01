import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User as IUser } from '@prisma/client';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: string;
  email: string;
  username: string;
  password: string;
  refreshToken: string;
}
