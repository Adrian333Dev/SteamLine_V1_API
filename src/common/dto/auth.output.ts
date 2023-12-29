import { ObjectType } from '@nestjs/graphql';
import { User } from '@/iam/user/entities';

@ObjectType()
export class AuthOutput {
  accessToken: string;
  refreshToken: string;
  user: User;
}
