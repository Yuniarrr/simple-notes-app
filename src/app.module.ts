import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

import { PrismaService } from 'infra/database/prisma/prisma.service';

import { NotesModule } from './notes/notes.module';

@Module({
  imports: [CacheModule.register(), NotesModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
