import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quote } from './entity/quotes.entity';
import { Repository } from 'typeorm';
import type {
  Quote as QuoteType,
  QuoteData,
  quoteId,
} from './types/quotes.model';

@Injectable()
export class QuotesService {
  constructor(
    // Inject TypeORM's Repository for the User entity
    @InjectRepository(Quote)
    private quoteRepository: Repository<Quote>,
  ) {}

  async findAll(): Promise<Quote[]> {
    return this.quoteRepository.find();
  }

  async findOne(id: quoteId): Promise<Quote | null> {
    return this.quoteRepository.findOne({ where: { id } });
  }

  async createQuote(quote: QuoteType): Promise<QuoteData> {
    const newQuote = this.quoteRepository.create(quote);
    return this.quoteRepository.save(newQuote);
  }

  async update(id: quoteId, quoteData: QuoteType): Promise<QuoteData | null> {
    console.log(id, quoteData);
    await this.quoteRepository.update(id, quoteData);

    return this.quoteRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.quoteRepository.delete(id);
  }
}
