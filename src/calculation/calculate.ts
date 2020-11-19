import { CalculationResult } from '~/models/CalculationResult';
import { Cost } from '~/models/Cost';
import { IncomeTaxType } from '~/models/IncomeTaxType';
import { Sale } from '~/models/Sale';
import { TaxPayer } from '~/models/TaxPayer';

import { roundSum } from './roundSum';

const addResults = (
  result1: CalculationResult,
  result2: CalculationResult
): CalculationResult => {
  return {
    incomeTaxSum: roundSum(result1.incomeTaxSum + result2.incomeTaxSum),
    revenue: roundSum(result1.revenue + result2.revenue),
    vatSum: roundSum(result1.vatSum + result2.vatSum),
  };
};

const subtractResults = (
  result1: CalculationResult,
  result2: CalculationResult
): CalculationResult => {
  return {
    incomeTaxSum: roundSum(result1.incomeTaxSum - result2.incomeTaxSum),
    revenue: roundSum(result1.revenue - result2.revenue),
    vatSum: roundSum(result1.vatSum - result2.vatSum),
  };
};

class Result implements CalculationResult {
  constructor(
    public readonly incomeTaxSum: number,
    public readonly vatSum: number,
    public readonly revenue: number
  ) {}
}

export const calculate = (
  sales: Sale[],
  costs: Cost[],
  taxPayer: TaxPayer
): CalculationResult | null => {
  if (taxPayer.incomeTaxType === IncomeTaxType.progressive) {
    throw new Error('not implemented');
  }

  const salesSumResult = sales.reduce<CalculationResult>(
    (currentSalesSum, sale) => {
      const { netPrice, vatSum } = sale;

      const incomeTaxSum = 0.19 * netPrice;
      const revenue = netPrice - incomeTaxSum;

      return addResults(
        currentSalesSum,
        new Result(incomeTaxSum, vatSum, revenue)
      );
    },
    new Result(0, 0, 0)
  );

  const costsSumResult = costs.reduce<CalculationResult>(
    (currentCostsSum, cost) => {
      const { netPrice, vatSum } = cost;

      const incomeTaxSum = 0.19 * netPrice;
      const revenueReduction = netPrice - incomeTaxSum;

      const nextResult = new Result(incomeTaxSum, vatSum, revenueReduction);

      return addResults(currentCostsSum, nextResult);
    },
    new Result(0, 0, 0)
  );

  return subtractResults(salesSumResult, costsSumResult);
};
