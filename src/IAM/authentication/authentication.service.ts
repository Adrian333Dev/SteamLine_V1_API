import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { HashingService } from '../hashing';
import { SignInInput, SignInOutput, SignUpInput } from './dto';
import { jwtConfig } from '../config';
import { IJwtPayload } from './interfaces';
import { IUserResponse } from '/user/interfaces';
import { UserRepository } from '/user/user.repository';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly hashingService: HashingService,
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpInput): Promise<IUserResponse> {
    const { password, ...userDetails } = signUpDto;
    const hashedPassword = await this.hashingService.hash(password);
    const user = await this.userRepo.create({
      data: { ...userDetails, password: hashedPassword },
    });
    delete user.password;
    return user;
  }

  async signIn(signInDto: SignInInput): Promise<SignInOutput> {
    const { username, password } = signInDto;
    const user = await this.userRepo.get({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    const payload: IJwtPayload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn: this.jwtConfiguration.accessTokenTtl,
    });
    return { accessToken };
  }
}
