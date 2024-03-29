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
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GetUser } from 'common/decorator';

import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/index';

@ApiTags('Category')
@Controller('category')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
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
    description: 'Get all categories',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @Get(':id/notes')
  async findAllNotesByCategory(
    @GetUser('id') user_id: string,
    @Param('id') id: number,
  ) {
    return await this.categoryService.findAllNotesByCategory(id, user_id);
  }

  @ApiOkResponse({
    description: 'Get category by id',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: number, @GetUser('id') user_id: string) {
    return await this.categoryService.findOne(id, user_id);
  }

  @ApiOkResponse({
    description: 'Update category by id',
  })
  @ApiNotFoundResponse({
    description: 'Category not found',
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
  @ApiNotFoundResponse({
    description: 'Category not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: number, @GetUser('id') user_id: string) {
    return await this.categoryService.remove(id, user_id);
  }
}
