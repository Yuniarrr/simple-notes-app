import { ApiProperty } from '@nestjs/swagger';

import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Input email',
    example: 'example@gmail.com',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Input username',
    example: 'username',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ApiProperty({
    description: 'Input password',
    example: 'password',
  })
  password: string;
}
