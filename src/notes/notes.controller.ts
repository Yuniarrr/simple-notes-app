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

import { CreateNoteDto, UpdateNoteDto } from './dto/index';
import { NotesService } from './notes.service';

@ApiTags('Notes')
@Controller('notes')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @ApiCreatedResponse({
    description: 'Create note',
  })
  @Post()
  async create(
    @Body(new ValidationPipe()) createNoteDto: CreateNoteDto,
    @GetUser('id') user_id: string,
  ) {
    return await this.notesService.create(createNoteDto, user_id);
  }

  @ApiOkResponse({
    description: 'Find all notes',
  })
  @Get()
  findAll(@GetUser('id') user_id: string) {
    return this.notesService.findAll(user_id);
  }

  @ApiOkResponse({
    description: 'Find all note by id',
  })
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser('id') user_id: string) {
    return await this.notesService.findOne(id, user_id);
  }

  @ApiOkResponse({
    description: 'Update note by id',
  })
  @Patch(':id')
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @GetUser('id') user_id: string,
  ) {
    return await this.notesService.update(id, updateNoteDto, user_id);
  }

  @ApiOkResponse({
    description: 'Delete note by id',
  })
  @ApiNoContentResponse({
    description: 'Delete note by id',
  })
  @ApiNotFoundResponse({
    description: 'Note not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser('id') user_id: string) {
    return await this.notesService.remove(id, user_id);
  }
}
