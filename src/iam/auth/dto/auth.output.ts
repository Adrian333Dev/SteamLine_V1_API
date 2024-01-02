import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

import { UserOutput } from './user.output';
import { TokensOutput } from './tokens.output';

@ObjectType()
export class AuthOutput extends TokensOutput {
  @IsNotEmpty()
  user: UserOutput;
}
