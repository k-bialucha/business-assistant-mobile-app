import { Currency } from './Currency';
import { VatRate } from './VatRate';

export interface Cost {
  currency: Currency;
  grossPrice: number;
  netPrice: number;
  vatRate: VatRate;
  vatSum: number;
}
