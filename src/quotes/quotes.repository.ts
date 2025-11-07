export interface Quote {
  id: number;
  text: string;
  author?: string;
}

export class QuotesRepository {
  findAll(): Promise<Quote[]> {
    return Promise.resolve([]);
  }

  findOne(_id: number): Promise<Quote | null> {
    return Promise.resolve(null);
  }

  create(data: Omit<Quote, 'id'>): Promise<Quote> {
    return Promise.resolve({ id: 1, ...data });
  }

  remove(_id: number): Promise<void> {
    return Promise.resolve();
  }
}
