import { Controller, Post, UseGuards, Req, Body, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';
import { AuthUser, SafeUser } from './types/auth.user';

type AuthenticatedRequestLocal = Request & { user: SafeUser | null };
type AuthenticatedRequestJwt = Request & { user: AuthUser | null };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: AuthenticatedRequestLocal, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
  @Get('me')
  herzeil(@Req() req: AuthenticatedRequestJwt) {
    return req.user;
  }
}
