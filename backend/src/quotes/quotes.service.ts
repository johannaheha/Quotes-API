import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './entities/quotes.entity';
import { UpdateQuoteDto } from './dto/update-quote.dto';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class QuotesService {
  constructor(
    @InjectRepository(Quote)
    private readonly quoteRepository: Repository<Quote>,
  ) {}

  async create(CreateQuoteDto: CreateQuoteDto): Promise<Quote> {
    const newQuote = this.quoteRepository.create(CreateQuoteDto);
    return await this.quoteRepository.save(newQuote);
  }

  async findAll(): Promise<Quote[]> {
    return await this.quoteRepository.find();
  }

  async findRandom(): Promise<Quote> {
    const quote = await this.quoteRepository
      .createQueryBuilder('q')
      .orderBy('RANDOM()')
      .getOne();

    if (!quote) throw new NotFoundException('No quotes available');
    return quote;
  }

  async findOne(id: number): Promise<Quote> {
    const quote = await this.quoteRepository.findOneBy({ id });
    if (!quote) {
      throw new NotFoundException(`Quote with id ${id} not found`);
    }
    return quote;
  }

  async update(id: number, updateQuoteDto: UpdateQuoteDto): Promise<Quote> {
    const quote = await this.findOne(id);
    const updatedQuote = Object.assign(quote, updateQuoteDto);
    return await this.quoteRepository.save(updatedQuote);
  }

  async remove(id: number): Promise<Quote> {
    const quote = await this.findOne(id);
    await this.quoteRepository.remove(quote);
    return quote;
  }
}
