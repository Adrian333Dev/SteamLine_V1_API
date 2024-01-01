import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignUpInput, SignInInput, AuthOutput } from './dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput, { name: 'signUp' })
  async signUp(@Args('signUpInput') input: SignUpInput): Promise<AuthOutput> {
    return this.authService.signUp(input);
  }

  @Mutation(() => AuthOutput, { name: 'signIn' })
  async signIn(@Args('signInInput') input: SignInInput): Promise<AuthOutput> {
    return this.authService.signIn(input);
  }

  @Mutation(() => { message: String }, { name: 'logOut' })
  async logOut(@Args('id') id: string): Promise<{ message: string }> {
    return this.authService.logOut(id);
  }
}
