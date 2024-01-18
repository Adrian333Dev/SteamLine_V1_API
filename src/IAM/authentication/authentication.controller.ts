import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticationService } from './authentication.service';
import { SignInInput, SignUpInput } from './dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpInput) {
    return this.authenticationService.signUp(signUpDto);
  }

  @Post('sign-in')
  async signIn(@Body() signInDto: SignInInput) {
    return this.authenticationService.signIn(signInDto);
  }
}
