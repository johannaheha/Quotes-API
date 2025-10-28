import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuotesService } from './quotes.service';

import type { Quote as QuoteType, quoteId } from './types/quotes.model';

@Controller('quotes')
export class QuotesController {
  constructor(private readonly quotesService: QuotesService) {}

  @Get()
  getAll() {
    return this.quotesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: quoteId) {
    return this.quotesService.findOne(id);
  }

  @Post()
  addQuote(@Body() quoteData: QuoteType) {
    return this.quotesService.createQuote(quoteData);
  }

  @Put(':id')
  update(@Param('id') id: quoteId, @Body() quoteData: QuoteType) {
    return this.quotesService.update(id, quoteData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quotesService.remove(+id);
  }
}
