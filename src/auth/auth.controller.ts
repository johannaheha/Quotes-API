import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Public } from './public.decorator';

type AuthenticatedRequest = Request & { user: any };

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Req() req: AuthenticatedRequest, @Body() _loginDto: LoginDto) {
    return this.authService.login(req.user);
  }
}
