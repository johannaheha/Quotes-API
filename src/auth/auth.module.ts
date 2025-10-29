import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Import your UsersModule
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Make sure your UsersModule is imported to use UserService
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your_secret_key', // USE A STRONG, ENVIRONMENTAL VARIABLE!
      signOptions: { expiresIn: '60s' }, // Token expiration (e.g., 60 seconds)
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy], // Add your strategies
  controllers: [AuthController],
  exports: [AuthService, JwtModule], // Export AuthService and JwtModule if needed elsewhere
})
export class AuthModule {}
