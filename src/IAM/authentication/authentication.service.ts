import {
  ConflictException,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { HashingService } from '../hashing';
import { SignInInput, SignUpInput } from './dto';
import { jwtConfig } from '../config';
import { IUserResponse } from '/user/interfaces';
import { IActiveUserData } from '../interfaces';
import { ID } from '/common/types';
import { ITokens } from './interfaces';
import { User } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp(signUpDto: SignUpInput): Promise<IUserResponse> {
    const { password, ...userDetails } = signUpDto;
    const hashedPassword = await this.hashingService.hash(password);
    const user = await this.prismaService.user.create({
      data: { ...userDetails, password: hashedPassword },
    });
    delete user.password;
    return user;
  }

  async signIn(signInDto: SignInInput): Promise<ITokens> {
    const { email, password } = signInDto;
    const user = await this.prismaService.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    this.logger.log(`jwtConf: ${JSON.stringify(this.jwtConf)}`);
    return await this.generateTokens(user);
  }

  async generateTokens(user: User): Promise<ITokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<IActiveUserData>>(
        user.id,
        this.jwtConf.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user.id, this.jwtConf.refreshTokenTtl),
    ]);
    user.refreshToken = refreshToken;
    await this.prismaService.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
    return { accessToken, refreshToken };
  }

  async refreshTokens(oldRefreshToken: string): Promise<ITokens> {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<IActiveUserData, 'sub'>
      >(oldRefreshToken, {
        secret: this.jwtConf.secret,
        audience: this.jwtConf.audience,
        issuer: this.jwtConf.issuer,
      });
      const user = await this.prismaService.user.findUnique({
        where: { id: sub },
      });
      if (user.refreshToken !== oldRefreshToken)
        throw new UnauthorizedException();
      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: ID, expiresIn: number, payload?: T) {
    return this.jwtService.signAsync(
      { sub: userId, ...payload },
      {
        audience: this.jwtConf.audience,
        issuer: this.jwtConf.issuer,
        secret: this.jwtConf.secret,
        expiresIn,
      },
    );
  }
}
