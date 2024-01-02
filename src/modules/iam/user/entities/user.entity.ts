import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User as IUser } from '@prisma/client';
import { IdType } from '@/common/types';

@ObjectType()
export class User implements IUser {
  @Field(() => ID)
  id: IdType;
  email: string;
  username: string;
  password: string;
  refreshToken: string;
}
