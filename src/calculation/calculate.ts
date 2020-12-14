import { CalculationResult } from '~/models/CalculationResult';
import { Cost } from '~/models/Cost';
import { IncomeTaxType } from '~/models/IncomeTaxType';
import { Sale } from '~/models/Sale';
import { TaxPayer } from '~/models/TaxPayer';

import { TAX_RATE_LINEAR } from './constants';
import { roundSum } from './roundSum';
class Result implements CalculationResult {
  constructor(
    public readonly incomeTaxSum: number,
    public readonly vatSum: number,
    public readonly revenue: number
  ) {}
}

const sumReducer = (acc: number, nextPrice: number): number => acc + nextPrice;

export const calculate = (
  sales: Sale[],
  costs: Cost[],
  taxPayer: TaxPayer
): CalculationResult | null => {
  if (taxPayer.incomeTaxType === IncomeTaxType.progressive) {
    throw new Error('not implemented');
  }

  const salesNetPrices = sales.map(sale => sale.netPrice);
  const salesVatSums = sales.map(sale => sale.vatSum);

  const costsNetPrices = costs.map(cost => -1 * cost.netPrice);
  const costsVatSums = costs.map(cost => -1 * cost.vatSum);

  const totalIncome = [...salesNetPrices, ...costsNetPrices].reduce(sumReducer);
  const totalVatSum = [...salesVatSums, ...costsVatSums].reduce(sumReducer);

  const totalTax = roundSum((TAX_RATE_LINEAR / 100) * totalIncome);
  const totalRevenue = roundSum((1 - TAX_RATE_LINEAR / 100) * totalIncome);

  return new Result(totalTax, totalVatSum, totalRevenue);
};
