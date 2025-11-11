import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true,              // Unbekannte Felder entfernen
      // forbidNonWhitelisted: false,  // Fehlermeldung bei unbekannten Feldern
      // transform: true,              // Payloads in DTO-Klassen transformieren
    }),
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(process.env.PORT ?? 4000);
}

void bootstrap();
