/* eslint-disable @darraghor/nestjs-typed/injectable-should-be-provided */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetUser } from 'common/decorator';

import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiCreatedResponse({
    description: 'Create category',
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) createCategoryDto: CreateCategoryDto,
    @GetUser('id') user_id: string,
  ) {
    return await this.categoryService.create(createCategoryDto, user_id);
  }

  @ApiOkResponse({
    description: 'Get all categories',
  })
  @Get()
  async findAll(@GetUser('id') user_id: string) {
    return await this.categoryService.findAll(user_id);
  }

  @ApiOkResponse({
    description: 'Get category by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: number, @GetUser('id') user_id: string) {
    return await this.categoryService.findOne(id, user_id);
  }

  @ApiOkResponse({
    description: 'Update category by id',
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) updateCategoryDto: UpdateCategoryDto,
    @GetUser('id') user_id: string,
  ) {
    return await this.categoryService.update(id, updateCategoryDto, user_id);
  }

  @ApiOkResponse({
    description: 'Delete category by id',
  })
  @ApiNoContentResponse({
    description: 'Delete category by id',
  })
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser('id') user_id: string) {
    return await this.categoryService.remove(id, user_id);
  }
}
