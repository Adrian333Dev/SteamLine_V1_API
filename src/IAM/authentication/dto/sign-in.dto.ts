import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}