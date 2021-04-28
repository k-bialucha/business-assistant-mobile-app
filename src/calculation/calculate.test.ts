import { AmountKind } from '~/models/AmountKind';
import { Cost } from '~/models/Cost';
import { Currency } from '~/models/Currency';
import { IncomeTaxType } from '~/models/IncomeTaxType';
import { Sale } from '~/models/Sale';

import { calculate } from './calculate';
import { CostElement } from './CostElement';
import { SaleElement } from './SaleElement';

const someMonthlySales: Sale[] = [new SaleElement('main contract', 10400, 23)];

const someMonthlyCosts: Cost[] = [
  new CostElement(
    123,
    AmountKind.GROSS,
    Currency.PLN,
    23,
    new Date('2021-01-01')
  ),
  new CostElement(
    150,
    AmountKind.GROSS,
    Currency.PLN,
    23,
    new Date('2021-01-01')
  ),
  new CostElement(
    300,
    AmountKind.GROSS,
    Currency.PLN,
    23,
    new Date('2021-01-01')
  ),
];

describe('calculation/calculate', () => {
  const calculatedSum = calculate(someMonthlySales, someMonthlyCosts, {
    incomeTaxType: IncomeTaxType.linear,
    isVatPayer: true,
  });

  it('calculates revenue correctly', () => {
    expect(calculatedSum?.revenue).toBeCloseTo(8046.66, 2);
  });

  it('calculates income tax sum correctly', () => {
    expect(calculatedSum?.incomeTaxSum).toBeCloseTo(1887.49, 2);
  });

  it('calculates VAT sum correctly', () => {
    expect(calculatedSum?.vatSum).toBeCloseTo(2284.85, 2);
  });
});
