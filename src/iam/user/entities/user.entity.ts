import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User as IUser } from '@prisma/client';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: number;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  lastLogin: Date | null;
}
