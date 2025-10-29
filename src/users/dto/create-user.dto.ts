// src/users/dto/create-user.dto.ts
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsAlphanumeric()
  @MinLength(3)
  @MaxLength(50)
  @Transform(({ value }) => value?.trim())
  username!: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }) => value?.trim())
  email?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  password!: string;

  @IsOptional()
  roles?: string[]; // optional; default im Service: ['user']
}
