// src/modules/auth/infrastructure/auth.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from '../application/dtos/login.dto';
import { LoginUseCase } from '../application/login.use-case';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto.email, dto.password);
  }
}
