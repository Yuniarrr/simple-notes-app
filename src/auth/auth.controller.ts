/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginAuthDto } from './dto/index';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'Create user',
  })
  @Post('register')
  async create(@Body(new ValidationPipe()) createAuthDto: CreateAuthDto) {
    const user = await this.authService.create(createAuthDto);

    return user;
  }

  @ApiCreatedResponse({
    description: 'Login user',
  })
  @Post('login')
  async login(@Body(new ValidationPipe()) data: LoginAuthDto) {
    const acccess_token = await this.authService.login(data);

    return { acccess_token };
  }
}
