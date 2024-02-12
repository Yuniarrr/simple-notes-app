import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdateNoteDto, type CreateNoteDto } from './dto/index';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateNoteDto, user_id: string) {
    const note = await this.prisma.notes.create({
      data: {
        title: data.title,
        body: data.body,
        user_id,
      },
    });

    await this.prisma.categoryNotes.create({
      data: { category_id: data.category_id, note_id: note.id },
    });

    return note;
  }

  async findAll(user_id: string) {
    return await this.prisma.notes.findMany({
      where: { user_id },
      include: {
        CategoryNotes: {
          select: {
            category: true,
          },
        },
      },
    });
  }

  async findOne(id: string, user_id: string) {
    const note = await this.prisma.notes.findUnique({
      where: { id, user_id },
    });

    if (!note) {
      throw new NotFoundException('Notes not found');
    }

    return note;
  }

  async update(id: string, data: UpdateNoteDto, user_id: string) {
    const isExist = await this.findOne(id, user_id);

    if (!isExist) {
      throw new NotFoundException('Notes not found');
    }

    const note = await this.prisma.notes.update({
      where: { id, user_id },
      data: { body: data.body, title: data.title },
    });

    return note;
  }

  async remove(id: string, user_id: string) {
    const isExist = await this.findOne(id, user_id);

    if (!isExist) {
      throw new NotFoundException('Notes not found');
    }

    await this.prisma.categoryNotes.deleteMany({
      where: { note_id: id },
    });

    return await this.prisma.notes.delete({
      where: { id, user_id },
    });
  }
}
