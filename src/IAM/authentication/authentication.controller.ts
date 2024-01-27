import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
} from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { RefreshTokensInput, SignInInput, SignUpInput } from './dto';
import { Response } from 'express';
import { Auth } from './decorators';
import { AuthType } from './enums';
import { ITokens } from './interfaces';

@Auth(AuthType.None)
@Controller('auth')
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);
  constructor(private readonly authService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpInput) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(
    @Res({ passthrough: true }) res: Response,
    @Body() signInDto: SignInInput,
  ) {
    const tokens = await this.authService.signIn(signInDto);
    // await this.setTokensToCookie(res, { accessToken, refreshToken });
    return tokens;
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh-tokens')
  async refreshTokens(@Body() { refreshToken }: RefreshTokensInput) {
    // const oldRefreshToken = res.req.cookies['refreshToken'];
    return this.authService.refreshTokens(refreshToken);
    // await this.setTokensToCookie(res, tokens);
  }

  private async setCookie(res: Response, key: string, value: string) {
    res.cookie(key, value, { secure: true, httpOnly: true, sameSite: true });
  }

  private async setTokensToCookie(
    res: Response,
    { accessToken, refreshToken }: ITokens,
  ) {
    await this.setCookie(res, 'accessToken', accessToken);
    await this.setCookie(res, 'refreshToken', refreshToken);
  }
}
