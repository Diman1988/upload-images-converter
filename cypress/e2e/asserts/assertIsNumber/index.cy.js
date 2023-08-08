import { assertIsNumber } from './../../../../src/asserts';

describe('assertIsNumber', () => {
  it('should throw an error when the value is not a number', () => {
    expect(() => assertIsNumber('a', 'param1')).to.throw(
      'Invalid input: param1 must be a number',
    );
    expect(() => assertIsNumber({}, 'param2')).to.throw(
      'Invalid input: param2 must be a number',
    );
    expect(() => assertIsNumber(null, 'param3')).to.throw(
      'Invalid input: param3 must be a number',
    );
    expect(() => assertIsNumber(undefined, 'param4')).to.throw(
      'Invalid input: param4 must be a number',
    );
    expect(() => assertIsNumber(NaN, 'param5')).to.throw(
      'Invalid input: param5 must be a number',
    );
    expect(() => assertIsNumber(true, 'param6')).to.throw(
      'Invalid input: param6 must be a number',
    );
  });

  it('should not throw an error when the value is a number', () => {
    expect(() => assertIsNumber(0, 'param7')).to.not.throw();
    expect(() => assertIsNumber(123, 'param8')).to.not.throw();
    expect(() => assertIsNumber(-123, 'param9')).to.not.throw();
    expect(() => assertIsNumber(3.14, 'param10')).to.not.throw();
    expect(() => assertIsNumber(-3.14, 'param11')).to.not.throw();
    expect(() => assertIsNumber(Number.MAX_VALUE, 'param12')).to.not.throw();
    expect(() => assertIsNumber(Number.MIN_VALUE, 'param13')).to.not.throw();
  });
});
