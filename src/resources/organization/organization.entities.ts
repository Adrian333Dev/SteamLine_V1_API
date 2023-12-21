import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Organization as IOrganization, User as IUser } from '@prisma/client';

@ObjectType()
export class Organization implements IOrganization {
  @Field(() => ID)
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  createdBy: IUser;
  createdById: number;
}
