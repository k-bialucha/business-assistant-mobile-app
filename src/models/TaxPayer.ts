import { IncomeTaxType } from './IncomeTaxType';

export interface TaxPayer {
  incomeTaxType: IncomeTaxType;
  isVatPayer: boolean;
}
