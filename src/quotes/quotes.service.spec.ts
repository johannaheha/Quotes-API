import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { QuotesRepository } from './quotes.repository';

describe('QuotesService', () => {
  let service: QuotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuotesService, QuotesRepository],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
