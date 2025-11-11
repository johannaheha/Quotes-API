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
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @Transform(({ value }): string => String(value).trim())
  username!: string;

  @IsOptional()
  @IsEmail()
  @Transform(({ value }): string | undefined =>
    value == null ? undefined : String(value).trim(),
  )
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password!: string;

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }): string[] | undefined => {
    if (value == null) return undefined;
    if (Array.isArray(value)) return value.map((v) => String(v).trim());

    return [String(value).trim()];
  })
  roles?: string[];
}
