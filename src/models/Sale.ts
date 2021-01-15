import { Currency } from './Currency';
import { VatRate } from './VatRate';

export interface Sale {
  classificationCode: string | null;
  currency: Currency;
  grossPrice: number;
  name: string;
  netPrice: number;
  vatRate: VatRate;
  vatSum: number;
}
