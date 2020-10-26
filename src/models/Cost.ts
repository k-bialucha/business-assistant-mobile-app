import { Currency } from './Currency';
import { VatRate } from './VatRate';

export interface Cost {
  currency: Currency;
  grossPrice: number;
  name: string;
  netPrice: number;
  vatRate: VatRate;
}
