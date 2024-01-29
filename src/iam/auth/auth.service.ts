import {
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { HashingService } from '../hashing';
import { jwtConfig } from '../config';
import { IActiveUserData } from '../interfaces';
import { ITokens } from './interfaces';
import { SignInInput, SignUpInput } from './auth.dtos';
import { User } from '../users/users.schema';
import { IUserResponse } from '../users/types/interfaces';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConf: ConfigType<typeof jwtConfig>,
  ) {}

  async signUp({ password, ...dto }: SignUpInput): Promise<IUserResponse> {
    const hashedPassword = await this.hashingService.hash(password);
    let user = await this.usersService.create({
      ...dto,
      password: hashedPassword,
    });
    (user = user.toObject()), delete user.password, delete user.__v;
    return user;
  }

  async signIn({ email, password }: SignInInput): Promise<ITokens> {
    const user = await this.usersService.findOneByQuery({ email }, '+password');
    this.logger.log(`User: ${JSON.stringify(user)}`);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isPasswordValid = await this.hashingService.compare(
      password,
      user.password,
    );
    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid credentials');
    return await this.generateTokens(user);
  }

  async generateTokens(user: User): Promise<ITokens> {
    this.logger.log(`Generating tokens for user ${JSON.stringify(user)}`);
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<IActiveUserData>>(
        user.id,
        this.jwtConf.accessTokenTtl,
        { email: user.email },
      ),
      this.signToken(user.id, this.jwtConf.refreshTokenTtl),
    ]);
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  }

  async refreshTokens(oldRefreshToken: string): Promise<ITokens> {
    try {
      const { sub } = await this.jwtService.verifyAsync<IActiveUserData>(
        oldRefreshToken,
        {
          secret: this.jwtConf.secret,
          audience: this.jwtConf.audience,
          issuer: this.jwtConf.issuer,
        },
      );

      const user = await this.usersService.findOneById(sub, '+refreshToken');
      if (!user) throw new UnauthorizedException();
      if (user.refreshToken !== oldRefreshToken)
        throw new UnauthorizedException();
      return this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException();
    }
  }

  private async signToken<T>(userId: string, expiresIn: number, payload?: T) {
    this.logger.log(`Signing token for user ${userId} with payload ${payload}`);
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
