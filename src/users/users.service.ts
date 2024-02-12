import { Injectable } from '@nestjs/common';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdateUserDto } from './dto/index';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findMe(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    delete user.password;

    return user;
  }

  async updateUser(id: string, data: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });

    delete user.password;

    return user;
  }
}
