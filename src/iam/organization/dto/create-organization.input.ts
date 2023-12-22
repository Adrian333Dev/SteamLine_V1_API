import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreateOrganizationInput
  implements Omit<Prisma.OrganizationCreateInput, 'createdBy'>
{
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
