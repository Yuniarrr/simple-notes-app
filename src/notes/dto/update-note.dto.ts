import { ApiPropertyOptional } from '@nestjs/swagger';

import { IsOptional, IsString } from 'class-validator';

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The title of the note.',
    example: 'My first note',
  })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The body of the note.',
    example: 'This is my first note.',
  })
  body?: string;
}
