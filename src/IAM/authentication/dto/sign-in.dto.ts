import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInInput {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class SignInOutput {
  accessToken: string;
}