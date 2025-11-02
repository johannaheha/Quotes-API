import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { SafeUser } from './types/auth.user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<SafeUser | null> {
    const user = await this.usersService.findByUsername(username);
    if (!user || !user.password) return null;

    const ok = await bcrypt.compare(pass, user.password);
    if (!ok) return null;

    const { password: _pw, ...rest } = user;
    return rest as SafeUser;
  }

  login(user: SafeUser) {
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles ?? [],
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
