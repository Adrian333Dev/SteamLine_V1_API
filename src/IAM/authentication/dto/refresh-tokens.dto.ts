import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokensInput {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
