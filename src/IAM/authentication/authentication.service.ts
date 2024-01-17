import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '/common/prisma';
import { PG_UNIQUE_CONSTRAINT_VIOLATION } from '/common/constants';
import { HashingService } from '../hashing';
import { SignInDto, SignUpDto } from './dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly hashingService: HashingService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, ...userDetails } = signUpDto;

    const hashedPassword = await this.hashingService.hash(password);

    try {
      const user = await this.prismaService.user.create({
        data: {
          ...userDetails,
          password: hashedPassword,
        },
      });

    } catch (error) {
      if (error.code === PG_UNIQUE_CONSTRAINT_VIOLATION)
        throw new ConflictException('User with those credentials already exists');
      throw error;
    }
  }

  async signIn(signInDto: SignInDto) {}
}
