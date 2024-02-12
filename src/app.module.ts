import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { PrismaService } from 'infra/database/prisma/prisma.service';
import { AuthModule } from './services/auth/auth.module';
import { NotesModule } from './services/notes/notes.module';
import { UsersModule } from './services/users/users.module';

@Module({
  imports: [CacheModule.register(), AuthModule, NotesModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
