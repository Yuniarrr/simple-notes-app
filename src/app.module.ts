import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { JWT_CONSTANT } from 'common';

import { AuthModule } from './auth/auth.module';
import { PrismaService } from './infra/database/prisma/prisma.service';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CacheModule.register(),
    AuthModule,
    NotesModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: JWT_CONSTANT.JWT_SECRET,
      signOptions: { expiresIn: JWT_CONSTANT.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
