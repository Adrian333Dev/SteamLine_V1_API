import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  MaxLength,
  Matches,
} from 'class-validator';

@InputType()
export class CreateUserInput implements Prisma.UserCreateInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must contain at least 8 characters, one uppercase, one lowercase and one number',
  })
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {}
