export interface Quote {
  id: number;
  text: string;
  author?: string;
}

export class QuotesRepository {
  async findAll(): Promise<Quote[]> {
    return [];
  }
  async findOne(id: number): Promise<Quote | null> {
    return null;
  }
  async create(data: Omit<Quote, 'id'>): Promise<Quote> {
    return { id: 1, ...data };
  }
  async remove(_id: number): Promise<void> {
    return;
  }
}
