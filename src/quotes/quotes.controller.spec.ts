import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

describe('QuotesController', () => {
  let controller: QuotesController;

  const serviceMock: jest.Mocked<
    Pick<QuotesService, 'findAll' | 'findOne' | 'create' | 'update' | 'remove'>
  > = {
    findAll: jest.fn().mockResolvedValue([]),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuotesController],
      providers: [{ provide: QuotesService, useValue: serviceMock }],
    }).compile();

    controller = module.get<QuotesController>(QuotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should delegate to service', async () => {
    await controller.findAll();
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it('create should delegate to service with typed DTO', async () => {
    const dto: CreateQuoteDto = { text: 'hi', author: 'you' };
    await controller.create(dto);
    expect(serviceMock.create).toHaveBeenCalledWith(dto);
  });
});
