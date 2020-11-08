import { Currency } from '~/models/Currency';
import { Sale } from '~/models/Sale';
import { VatRate } from '~/models/VatRate';

export class SaleElement implements Sale {
  public code: string | null = null;
  public readonly currency: Currency = Currency.PLN;

  get grossPrice(): number {
    const { netPrice, vatSum } = this;

    return netPrice + vatSum;
  }

  get vatSum(): number {
    const { netPrice, vatRate } = this;

    return (vatRate / 100) * netPrice;
  }

  constructor(
    public readonly name: string,
    public readonly netPrice: number,
    public readonly vatRate: VatRate = 23
  ) {}
}
