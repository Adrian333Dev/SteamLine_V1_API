import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RefreshTokensInput, SignInInput, SignUpInput } from './auth.dtos';
import { Response } from 'express';
import { Auth } from './decorators';
import { AuthType } from './enums';

@Auth(AuthType.None)
@Controller('iam/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpInput) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInInput) {
    this.logger.log('signInDto: ' + JSON.stringify(signInDto));
    const tokens = await this.authService.signIn(signInDto);
    // await this.setTokensToCookie(res, { accessToken, refreshToken });
    return tokens;
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(@Body() { refreshToken }: RefreshTokensInput) {
    this.logger.log('refreshTokensDto: ' + JSON.stringify({ refreshToken }));
    // const oldRefreshToken = res.req.cookies['refreshToken'];
    return this.authService.refreshTokens(refreshToken);
    // await this.setTokensToCookie(res, tokens);
  }

  // private async setCookie(res: Response, key: string, value: string) {
  //   res.cookie(key, value, { secure: true, httpOnly: true, sameSite: true });
  // }

  // private async setTokensToCookie(
  //   res: Response,
  //   { accessToken, refreshToken }: ITokens,
  // ) {
  //   await this.setCookie(res, 'accessToken', accessToken);
  //   await this.setCookie(res, 'refreshToken', refreshToken);
  // }
}
