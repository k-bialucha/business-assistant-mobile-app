import { Currency } from './Currency';
import { VatRate } from './VatRate';

export interface Sale {
  code: string | null;
  currency: Currency;
  grossPrice: number;
  name: string;
  netPrice: number;
  vatRate: VatRate;
}
