import { Injectable } from '@nestjs/common';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type CreateNoteDto } from './dto/create-note.dto';
import { type UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createNoteDto: CreateNoteDto) {
    const note = await this.prisma.notes.create({
      data: {
        ...createNoteDto,
      },
    });

    return note;
  }

  async findAll() {
    const notes = await this.prisma.notes.findMany();

    return notes;
  }

  async findOne(id: string) {
    const note = await this.prisma.notes.findFirst({
      where: {
        id,
      },
    });

    return note;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    const note = await this.prisma.notes.update({
      where: {
        id,
      },
      data: {
        ...updateNoteDto,
      },
    });

    return note;
  }

  async remove(id: string) {
    return await this.prisma.notes.delete({
      where: {
        id,
      },
    });
  }
}
