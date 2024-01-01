import { User } from '@/iam/user/entities';
import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';


@ObjectType()
export class AuthOutput {
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @IsNotEmpty()
  @IsString()
  refreshToken: string;

  @IsNotEmpty()
  user: Omit<User, 'password'>;
}
