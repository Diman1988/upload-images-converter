import { assertIsPositiveNumber } from './../../../../src/asserts';

describe('assertIsPositiveNumber', () => {
  it('should pass when the input is a positive number', () => {
    assertIsPositiveNumber(123);
  });

  it('should throw an error when the input is zero', () => {
    expect(() => {
      assertIsPositiveNumber(0);
    }).to.throw('Expected a positive number, but received 0');
  });

  it('should throw an error when the input is a negative number', () => {
    expect(() => {
      assertIsPositiveNumber(-123);
    }).to.throw('Expected a positive number, but received -123');
  });

  it('should throw an error when the input is not a number', () => {
    expect(() => {
      assertIsPositiveNumber('123');
    }).to.throw('Expected a positive number, but received 123');
  });
});
