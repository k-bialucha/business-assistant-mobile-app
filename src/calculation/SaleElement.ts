import { Currency } from '~/models/Currency';
import { Sale } from '~/models/Sale';
import { VatRate } from '~/models/VatRate';

import { roundSum } from './roundSum';

export class SaleElement implements Sale {
  public classificationCode: string | null = null;
  public readonly currency: Currency = Currency.PLN;

  get grossPrice(): number {
    return this.netPrice + this.vatSum;
  }

  get vatSum(): number {
    return roundSum((this.vatRate / 100) * this.netPrice);
  }

  constructor(
    public readonly name: string,
    public readonly netPrice: number,
    public readonly vatRate: VatRate = 23
  ) {}
}
