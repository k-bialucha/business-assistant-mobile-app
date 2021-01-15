import { Currency } from '~/models/Currency';

import { SaleElement } from './SaleElement';

describe('calculation/SaleElement', () => {
  const somePrice = 777.94;
  const someSaleElement = new SaleElement('test sale element', somePrice, 8);

  it('sets properties correctly', () => {
    const { name, netPrice, vatRate, currency } = someSaleElement;

    expect(name).toBe('test sale element');
    expect(netPrice).toBe(somePrice);
    expect(vatRate).toBe(8);
    expect(currency).toBe(Currency.PLN);
  });

  it('allows to set code', () => {
    expect(someSaleElement.classificationCode).toBeNull();

    const someCode = '62.01.11';

    someSaleElement.classificationCode = someCode;

    expect(someSaleElement.classificationCode).toBe(someCode);
  });

  const expectedGrossPrice = 840.18;

  it('calculates VAT sum correctly', () => {
    expect(someSaleElement.vatSum).toBeCloseTo(
      expectedGrossPrice - somePrice,
      2
    );
  });

  it('calculates gross price correctly', () => {
    expect(someSaleElement.grossPrice).toBeCloseTo(expectedGrossPrice, 2);
  });
});
