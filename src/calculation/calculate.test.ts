import { Cost } from '~/models/Cost';
import { IncomeTaxType } from '~/models/IncomeTaxType';
import { Sale } from '~/models/Sale';

import { calculate } from './calculate';
import { CostElement } from './CostElement';
import { SaleElement } from './SaleElement';

const someMonthlySales: Sale[] = [new SaleElement('main contract', 10400, 23)];

const someMonthlyCosts: Cost[] = [
  new CostElement('item 1', 355.92, 23),
  new CostElement('item 2', 117.07, 23),
  new CostElement('item 3', 21.02, 5),
];

describe('calculation/calculate', () => {
  const calculatedSum = calculate(someMonthlySales, someMonthlyCosts, {
    incomeTaxType: IncomeTaxType.linear,
    isVatPayer: true,
  });

  it('calculates revenue correctly', () => {
    expect(calculatedSum?.revenue).toBeCloseTo(8023.85, 2);
  });

  it('calculates income tax sum correctly', () => {
    expect(calculatedSum?.incomeTaxSum).toBeCloseTo(1882.14, 2);
  });

  it('calculates VAT sum correctly', () => {
    expect(calculatedSum?.vatSum).toBeCloseTo(2282.16, 2);
  });
});
