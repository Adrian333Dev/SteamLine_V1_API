import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/modules/prisma';
import { ConfigService } from '@nestjs/config';

import { SignUpInput, SignInInput, AuthOutput } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {}

  async signUp(user: SignUpInput): Promise<AuthOutput> {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      const { password, ...result } = await this.prismaService.user.create({
        data: { ...user, password: hash },
      });
      const tokens = await this.getTokens(result.id, result.email);
      await this.updateRefreshToken(result.id, tokens.refreshToken);
      return { user: { ...result }, ...tokens };
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Credentials already taken');
      else throw new BadRequestException('Bad Request');
    }
  }

  async signIn(user: SignInInput): Promise<AuthOutput> {
    try {
      const result = await this.prismaService.user.findUnique({
        where: { email: user.email },
      });
      if (!result) throw new NotFoundException('User not found');
      const isMatch = await bcrypt.compare(user.password, result.password);
      if (!isMatch) throw new UnauthorizedException('Invalid credentials');
      const tokens = await this.getTokens(result.id, result.email);
      await this.updateRefreshToken(result.id, tokens.refreshToken);
      return { user: { ...result }, ...tokens };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async logOut(id: string) {
    try {
      const result = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!result) throw new NotFoundException('User not found');
      await this.updateRefreshToken(result.id, '');
      return { message: 'Successfully logged out' };
    } catch (error) {
      throw new ForbiddenException('Forbidden');
    }
  }

  async refreshTokens(id: string, refreshToken: string) {
    try {
      const result = await this.prismaService.user.findUnique({
        where: { id },
      });
      if (!result) throw new NotFoundException('User not found');
      if (result.refreshToken !== refreshToken)
        throw new UnauthorizedException('Invalid credentials');
      const tokens = await this.getTokens(result.id, result.email);
      await this.updateRefreshToken(result.id, tokens.refreshToken);
      return { ...result, ...tokens };
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getTokens(
    id: string,
    email: string
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(
        { sub: id, email },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        }
      ),
      this.jwtService.sign(
        { sub: id, email },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }
      ),
    ]);
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(id: string, refreshToken: string) {
    return this.prismaService.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
}
