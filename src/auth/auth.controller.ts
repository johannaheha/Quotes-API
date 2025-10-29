// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

type AuthenticatedRequest = Request & { user: any }; // oder eigenes User-Interface

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: AuthenticatedRequest, @Body() _loginDto: LoginDto) {
    // req.user kommt aus LocalStrategy.validate(...)
    return this.authService.login(req.user);
  }
}
