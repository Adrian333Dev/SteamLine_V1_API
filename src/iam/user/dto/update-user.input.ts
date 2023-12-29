import { InputType, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { IsEmpty } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsEmpty()
  password: string;
}
