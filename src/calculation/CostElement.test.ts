import { AmountKind } from '~/models/AmountKind';
import { Currency } from '~/models/Currency';

import { CostElement } from './CostElement';

describe('calculation/CostElement', () => {
  describe('created with NET price', () => {
    const someNetPrice = 1099.91;
    const someDate = new Date();
    const someCostElement = new CostElement(
      someNetPrice,
      AmountKind.NET,
      Currency.PLN,
      23,
      someDate
    );

    it('sets properties correctly', () => {
      const {
        amount,
        amountKind,
        currency,
        vatRate,
        purchaseDate,
      } = someCostElement;

      expect(amount).toBe(someNetPrice);
      expect(amountKind).toBe(AmountKind.NET);
      expect(vatRate).toBe(23);
      expect(currency).toBe(Currency.PLN);
      expect(purchaseDate).toBe(someDate);
    });

    const expectedGrossPrice = 1352.89;

    it('calculates VAT sum correctly for passed NET price', () => {
      expect(someCostElement.vatSum).toBeCloseTo(
        expectedGrossPrice - someNetPrice,
        2
      );
    });

    it('calculates gross price correctly', () => {
      expect(someCostElement.grossPrice).toBeCloseTo(expectedGrossPrice, 2);
    });
  });

  describe('created with GROSS price', () => {
    const someGrossPrice = 1230;
    const someDate = new Date();
    const someCostElement = new CostElement(
      someGrossPrice,
      AmountKind.GROSS,
      Currency.PLN,
      23,
      someDate
    );

    const expectedNetPrice = 1000;

    it('calculates VAT sum correctly for passed GROSS price', () => {
      expect(someCostElement.vatSum).toBeCloseTo(
        someGrossPrice - expectedNetPrice,
        2
      );
    });

    it('calculates net price correctly', () => {
      expect(someCostElement.netPrice).toBeCloseTo(expectedNetPrice, 2);
    });
  });
});
