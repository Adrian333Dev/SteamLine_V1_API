import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { OmitType } from '@nestjs/mapped-types';

export class SignUpInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class SignInInput extends OmitType(SignUpInput, ['username']) {}

export class RefreshTokensInput {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
