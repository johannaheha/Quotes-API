export type quoteId = number;

export interface Quote {
  quote: string;
  author?: string;
}

export interface QuoteData extends Quote {
  id: quoteId;
}
