import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateQuoteDto {
  @IsString()
  @IsNotEmpty({ message: 'quote must not be empty.' })
  @MaxLength(500, { message: 'quote must be at most 500 characters.' })
  @Transform(({ value }: TransformFnParams): string =>
    typeof value === 'string' ? value.trim() : String(value),
  )
  quote!: string;

  @IsOptional()
  @IsString()
  @MaxLength(255, { message: 'author must be at most 255 characters.' })
  @Transform(({ value }: TransformFnParams): string | undefined => {
    if (value == null) return undefined; // lässt undefined/null durch
    const s = String(value).trim();
    return s === '' ? undefined : s; // leere Strings werden zu undefined
  })
  author?: string;
}
