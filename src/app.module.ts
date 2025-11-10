import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
    // lädt .env (lokal) und ENV Variablen (Render)
    ConfigModule.forRoot({ isGlobal: true }),

    QuotesModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // z.B. ...?sslmode=require
      ssl: { rejectUnauthorized: false }, // nötig für Render-Postgres (TLS)
      entities: [Quote, User],
      synchronize: true, // für ersten Deploy ok; später auf false + Migrations umstellen
      logging: ['query', 'error'],
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
