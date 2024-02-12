/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcryptjs from 'bcryptjs';
import { JWT_CONSTANT } from 'common';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type LoginAuthDto, type CreateAuthDto } from './dto/index';

const salt = bcryptjs.genSaltSync(12);
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async create(data: CreateAuthDto) {
    const hashedPassword = bcryptjs.hashSync(data.password, salt);
    const create = { ...data, password: hashedPassword };

    const user = await this.prisma.user.create({
      data: create,
    });

    return user.id;
  }

  async login(data: LoginAuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials not found');
    }

    const isPasswordMatch = bcryptjs.compareSync(data.password, user.password);

    if (!isPasswordMatch) {
      throw new ForbiddenException('Credentials not found');
    }

    const token = await this.getToken(user.id, user.email);

    return token;
  }

  async getToken(user_id: string, email: string): Promise<{ token: string }> {
    const payload = {
      user_id,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: JWT_CONSTANT.JWT_SECRET,
      expiresIn: JWT_CONSTANT.JWT_EXPIRES_IN,
    });

    return {
      token,
    };
  }
}
