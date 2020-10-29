import { CalculationResult } from '~/models/CalculationResult';
import { Cost } from '~/models/Cost';
import { IncomeTaxType } from '~/models/IncomeTaxType';
import { Sale } from '~/models/Sale';
import { TaxPayer } from '~/models/TaxPayer';

const addResults = (
  result1: CalculationResult,
  result2: CalculationResult
): CalculationResult => {
  return {
    incomeTaxSum: result1.incomeTaxSum + result2.incomeTaxSum,
    revenue: result1.revenue + result2.revenue,
    vatSum: result1.revenue + result2.vatSum,
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const subtractResults = (
  result1: CalculationResult,
  result2: CalculationResult
): CalculationResult => {
  return {
    incomeTaxSum: result1.incomeTaxSum - result2.incomeTaxSum,
    revenue: result1.revenue - result2.revenue,
    vatSum: result1.revenue - result2.vatSum,
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
): number | null => {
  if (taxPayer.incomeTaxType === IncomeTaxType.progressive) {
    throw new Error('not implemented');
  }

  const costsSumResult = costs.reduce<CalculationResult>(
    (currentCostsSum, cost) => {
      const { netPrice, vatSum } = cost;

      const incomeTaxSum = 0.19 * netPrice;
      const revenue = netPrice - incomeTaxSum;

      const nextResult = new Result(revenue, incomeTaxSum, vatSum);

      return addResults(currentCostsSum, nextResult);
    },
    new Result(0, 0, 0)
  );

  return costsSumResult.vatSum;
};
