import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { AuthModule } from './services/auth/auth.module';
import { NotesModule } from './services/notes/notes.module';
import { UsersModule } from './services/users/users.module';
import { NotesModule } from './notes/notes.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CacheModule.register(), AuthModule, NotesModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
