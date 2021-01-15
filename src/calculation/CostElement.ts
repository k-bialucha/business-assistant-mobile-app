import { Cost } from '~/models/Cost';
import { Currency } from '~/models/Currency';
import { VatRate } from '~/models/VatRate';

import { roundSum } from './roundSum';

export class CostElement implements Cost {
  readonly currency: Currency = Currency.PLN;

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
