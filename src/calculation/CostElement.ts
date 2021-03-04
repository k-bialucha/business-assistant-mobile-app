import { AmountKind } from '~/models/AmountKind';
import { Cost } from '~/models/Cost';
import { Currency } from '~/models/Currency';
import { VatRate } from '~/models/VatRate';

import { roundSum } from './roundSum';

export class CostElement implements Cost {
  get grossPrice(): number {
    return this.amountKind === AmountKind.GROSS
      ? this.amount
      : this.amount + this.vatSum;
  }

  get netPrice(): number {
    return this.amountKind === AmountKind.NET
      ? this.amount
      : this.amount - this.vatSum;
  }

  get vatSum(): number {
    if (this.amountKind === AmountKind.NET) {
      return roundSum((this.vatRate / 100) * this.amount);
    } else {
      return roundSum(
        (this.amount * (this.vatRate / 100)) / (1 + this.vatRate / 100)
      );
    }
  }

  constructor(
    public readonly amount: number,
    public readonly amountKind: AmountKind,
    public readonly currency: Currency,
    public readonly vatRate: VatRate,
    public readonly purchaseDate: Date
  ) {}
}
