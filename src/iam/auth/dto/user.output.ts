import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User as IUser } from '@prisma/client';
import { IdType } from '@/common/types';

@ObjectType()
export class UserOutput implements Omit<IUser, 'password'> {
  @Field(() => ID)
  id: IdType;
  email: string;
  username: string;
  refreshToken: string;
}
