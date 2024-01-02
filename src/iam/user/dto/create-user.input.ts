// import { InputType } from '@nestjs/graphql';
// import { Prisma } from '@prisma/client';
// import {
//   IsNotEmpty,
//   IsString,
//   MinLength,
//   IsEmail,
//   MaxLength,
//   Matches,
// } from 'class-validator';

// @InputType()
// export class CreateUserInput implements Prisma.UserCreateInput {
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(3)
//   @MaxLength(20)
//   username: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(8)
//   @MaxLength(20)
//   @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
//     message:
//       'Password must contain at least 8 characters, one uppercase, one lowercase and one number',
//   })
//   password: string;
// }
