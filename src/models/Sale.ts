export interface Sale {
  code?: string;
  currency: 'PLN';
  grossPrice: number;
  name: string;
  netPrice: number;
  VAT: 0 | 5 | 8 | 23;
}
