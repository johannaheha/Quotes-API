import { Test, TestingModule } from '@nestjs/testing';
import { QuotesController } from './quotes.controller';
import { QuotesService } from './quotes.service';

describe('QuotesController', () => {
  let controller: QuotesController;

  const serviceMock = {
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
    await controller.findAll?.();
    expect(serviceMock.findAll).toHaveBeenCalled();
  });

  it('create should delegate to service', async () => {
    const dto = { text: 'hi', author: 'you' } as any;
    await controller.create?.(dto);
    expect(serviceMock.create).toHaveBeenCalledWith(dto);
  });
});
