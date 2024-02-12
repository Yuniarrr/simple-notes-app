import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
