import { Currency } from '~/models/Currency';

import { CostElement } from './CostElement';

describe('calculation/CostElement', () => {
  const somePrice = 1099.91;
  const someCostElement = new CostElement('test cost element', somePrice, 23);

  it('sets properties correctly', () => {
    const { name, netPrice, vatRate, currency } = someCostElement;

    expect(name).toBe('test cost element');
    expect(netPrice).toBe(somePrice);
    expect(vatRate).toBe(23);
    expect(currency).toBe(Currency.PLN);
  });

  const expectedGrossPrice = 1352.89;

  it('calculates VAT sum correctly', () => {
    expect(someCostElement.vatSum).toBeCloseTo(
      expectedGrossPrice - somePrice,
      2
    );
  });

  it('calculates gross price correctly', () => {
    expect(someCostElement.grossPrice).toBeCloseTo(expectedGrossPrice, 2);
  });
});
