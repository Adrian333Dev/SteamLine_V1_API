import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsEmail,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

@InputType()
export class CreateOrganizationInput
  implements Omit<Prisma.OrganizationCreateInput, 'createdBy'>
{
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsOptional()
  @IsString()
  description?: string;
}

@InputType()
export class UpdateOrganizationInput extends PartialType(
  CreateOrganizationInput
) {}
