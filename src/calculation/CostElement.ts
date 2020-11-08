import { Cost } from '~/models/Cost';
import { Currency } from '~/models/Currency';
import { VatRate } from '~/models/VatRate';

import { roundSum } from './roundSum';

export class CostElement implements Cost {
  readonly currency: Currency = Currency.PLN;

  get grossPrice(): number {
    const { netPrice, vatRate } = this;

    return roundSum(((100 + vatRate) / 100) * netPrice);
  }

  get vatSum(): number {
    return roundSum(this.grossPrice - this.netPrice);
  }

  constructor(
    public readonly name: string,
    public readonly netPrice: number,
    public readonly vatRate: VatRate = 23
  ) {}
}
