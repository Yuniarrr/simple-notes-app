import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'The title of the note.',
    example: 'My first note',
  })
  title: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    description: 'The body of the note.',
    example: 'This is my first note.',
  })
  body?: string;
}
