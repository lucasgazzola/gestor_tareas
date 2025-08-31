import { Controller, Post, Body, Put } from '@nestjs/common';

import { RegisterDto } from '../application/dtos/register.dto';
import { RegisterUseCase } from '../application/register.user-case';

@Controller('users')
export class UserController {
  constructor(private readonly registerUseCase: RegisterUseCase) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.registerUseCase.execute(registerDto);
  }
}
