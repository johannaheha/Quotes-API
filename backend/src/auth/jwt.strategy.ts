import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthUser } from './types/auth.user';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Set to true if you want to allow expired tokens (not recommended for most cases)
      secretOrKey: process.env.JWT_SECRET || 'your_secret_key', // MUST match the secret used in JwtModule.register
    });
  }

  async validate(payload: any): Promise<AuthUser> {
    const user = await this.usersService.findById(Number(payload.sub)); // Assuming findById exists and fetches the user
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      userId: payload.sub as string,
      username: payload.username as string,
      roles: payload.roles as string[],
    }; // This object will be attached to req.user
  }
}
