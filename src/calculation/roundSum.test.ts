import { roundSum } from './roundSum';

describe('calculation/roundSum', () => {
  it('rounds sum to two floating points 1', () => {
    const someSum = 10 / 9;

    const roundedSum = roundSum(someSum);

    expect(roundedSum).toBe(1.11);
  });

  it('rounds sum to two floating points 2', () => {
    const someSum = 2.7182818;

    const roundedSum = roundSum(someSum);

    expect(roundedSum).toBe(2.72);
  });
});
