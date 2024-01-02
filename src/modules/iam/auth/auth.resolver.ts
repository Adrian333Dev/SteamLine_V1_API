import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput, SignInInput, AuthOutput } from './dto';
import { IdType } from '@/common/types';
import { CurrentUser, CurrentUserId, Public } from './decorators';
import { UseGuards } from '@nestjs/common';
import { RefreshTokenGuard } from './guards';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => AuthOutput, { name: 'signUp' })
  async signUp(@Args('signUpInput') input: SignUpInput): Promise<AuthOutput> {
    return this.authService.signUp(input);
  }

  @Public()
  @Mutation(() => AuthOutput, { name: 'signIn' })
  async signIn(@Args('signInInput') input: SignInInput): Promise<AuthOutput> {
    return this.authService.signIn(input);
  }

  @Mutation(() => Boolean, { name: 'signOut' })
  async signOut(@Args('id') id: IdType): Promise<boolean> {
    return this.authService.logOut(id);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Mutation(() => AuthOutput, { name: 'refreshTokens' })
  async refreshTokens(
    @CurrentUserId() id: IdType,
    @CurrentUser('refreshToken') refreshToken: string
  ): Promise<AuthOutput> {
    return this.authService.refreshTokens(id, refreshToken);
  }

  @Query(() => String, { name: 'testAuth' })
  async testAuth(): Promise<string> {
    return 'Auth works!';
  }
}

/* Queries and Mutations

mutation {
  signUp(signUpInput: {
    username: "admin",
    email: "admin@exampe.com",
    password: "password123"
  }) {
    accessToken
    refreshToken
    user {
      id
      username
      email
    }
  }

  signIn(signInInput: {
    email: "admin@exampe.com",
    password: "password123"
  }) {
    accessToken
    refreshToken
    user {
      id
      username
      email
    }
  }

  signOut(id: "1") // true

  refreshTokens {
    accessToken
    refreshToken
    user {
      id
      username
      email
    }
  }
}

HTTP HEADERS
{ "authorization": "Bearer <accessToken>"}
*/
