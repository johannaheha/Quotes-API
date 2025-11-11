import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';

describe('QuotesService', () => {
  let service: QuotesService;

  const repoMock = {
    find: jest.fn().mockResolvedValue([]),
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        { provide: 'QuoteRepository', useValue: repoMock },
      ],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should call repository.find', async () => {
    await service.findAll?.();
    expect(repoMock.find).toHaveBeenCalled();
  });
});
