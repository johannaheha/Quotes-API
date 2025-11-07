export interface Quote {
  id: number;
  text: string;
  author?: string;
}

export class QuotesRepository {
  findAll(): Promise<Quote[]> {
    return [];
  }
  findOne(id: number): Promise<Quote | null> {
    return null;
  }
  create(data: Omit<Quote, 'id'>): Promise<Quote> {
    return { id: 1, ...data };
  }
  remove(_id: number): Promise<void> {
    return;
  }
}
