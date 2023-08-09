import { assertIsNonNegativeNumber } from './';

describe('assertIsNonNegativeNumber', () => {
  it('should return the value if it is a non-negative number', () => {
    expect(() => assertIsNonNegativeNumber(0)).to.not.throw();
    expect(() => assertIsNonNegativeNumber(10)).to.not.throw();
  });

  it('should throw an error if the value is a negative number', () => {
    expect(() => assertIsNonNegativeNumber(-1)).to.throw();
  });

  it('should throw an error if the value is not a number', () => {
    expect(() => assertIsNonNegativeNumber('hello')).to.throw();
    expect(() => assertIsNonNegativeNumber(undefined)).to.throw();
    expect(() => assertIsNonNegativeNumber(null)).to.throw();
    expect(() => assertIsNonNegativeNumber({})).to.throw();
    expect(() => assertIsNonNegativeNumber([])).to.throw();
  });

  it('should throw an error if the value is Infinity', () => {
    expect(() => assertIsNonNegativeNumber(Infinity)).to.throw();
  });

  it('should throw an error if the value is NaN', () => {
    expect(() => assertIsNonNegativeNumber(NaN)).to.throw();
  });
});
