import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Name category',
    example: 'Category',
  })
  name: string;
}
