import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { Quote } from './entities/quotes.entity';
import { Public } from '../auth/public.decorator';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Post()
  create(@Body() dto: CreateQuoteDto): Promise<Quote> {
    return this.quotesService.create(dto);
  }

  @Public()
  @Get()
  findAll(): Promise<Quote[]> {
    return this.quotesService.findAll();
  }

  @Get('random')
  getRandom(): Promise<Quote> {
    return this.quotesService.findRandom();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this.quotesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuoteDto,
  ): Promise<Quote> {
    return this.quotesService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<Quote> {
    return this.quotesService.remove(id);
  }
}
