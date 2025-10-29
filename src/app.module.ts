import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesModule } from './quotes/quotes.module';
import { APP_GUARD } from '@nestjs/core';
import { Quote } from './quotes/entities/quotes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    QuotesModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'dev.sqlite',
      entities: [Quote, User],
      synchronize: false,
      logging: false,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
