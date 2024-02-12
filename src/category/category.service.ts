/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../infra/database/prisma/prisma.service';
import { type UpdateCategoryDto, type CreateCategoryDto } from './dto/index';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDto, user_id: string) {
    const category = await this.prisma.category.create({
      data: { ...data, user_id },
    });

    return category;
  }

  async findAll(user_id: string) {
    const categories = await this.prisma.category.findMany({
      where: { user_id },
    });

    return categories;
  }

  async findOne(id: number, user_id: string) {
    const category = await this.prisma.category.findUniqueOrThrow({
      where: { id, user_id },
    });

    if (!category) {
      throw new NotFoundException('Category not fount');
    }

    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
    user_id: string,
  ) {
    const isExist = await this.findOne(id, user_id);

    if (!isExist) {
      throw new NotFoundException('Category not found');
    }

    const category = await this.prisma.category.update({
      where: { id, user_id },
      data: { ...updateCategoryDto },
    });

    return category;
  }

  async remove(id: number, user_id: string) {
    const isExist = await this.findOne(id, user_id);

    if (!isExist) {
      throw new NotFoundException('Category not found');
    }

    const category = await this.prisma.category.delete({
      where: { id, user_id },
    });

    return category;
  }
}
