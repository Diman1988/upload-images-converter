import { assertNotNullOrUndefined } from './../../../../src/asserts';

describe('assertNotNullOrUndefined', () => {
  // 1. Тест на выброс исключения при значении null
  it('should throw an error when the value is null', () => {
    expect(() => assertNotNullOrUndefined(null, 'testParam')).to.throw(
      'testParam must not be null or undefined.',
    );
  });

  // 2. Тест на выброс исключения при значении undefined
  it('should throw an error when the value is undefined', () => {
    expect(() => assertNotNullOrUndefined(undefined, 'testParam')).to.throw(
      'testParam must not be null or undefined.',
    );
  });

  // 3. Тест на отсутствие исключения для других значений
  const values = [0, '', [], {}, true, false, Symbol(), -1, 1.5];
  values.forEach((value) => {
    const valueDescription =
      typeof value === 'symbol' ? 'Symbol' : JSON.stringify(value);
    it(`should not throw an error for value: ${valueDescription}`, () => {
      expect(() => assertNotNullOrUndefined(value, 'testParam')).not.to.throw();
    });
  });
  // 4. Проверка корректности имени параметра
  it('should use the provided parameter name in the error message', () => {
    const customParamName = 'customName';
    expect(() => assertNotNullOrUndefined(null, customParamName)).to.throw(
      `${customParamName} must not be null or undefined.`,
    );
  });

  // 5. Тест на типы значений, возвращаемых функцией
  it('should return undefined when the value is neither null nor undefined', () => {
    const returnValue = assertNotNullOrUndefined('testValue', 'testParam');
    expect(returnValue).to.be.undefined;
  });

  // 6. Тест на отсутствие исключения для функций и регулярных выражений
  const additionalValues = [function () {}, /regex/];
  additionalValues.forEach((value) => {
    const valueDescription = Object.prototype.toString.call(value).slice(8, -1); // Получаем имя типа (Function или RegExp)
    it(`should not throw an error for type: ${valueDescription}`, () => {
      expect(() => assertNotNullOrUndefined(value, 'testParam')).not.to.throw();
    });
  });

  // 7. Проверка поведения функции без предоставления имени параметра
  it('should throw a generic error message if paramName is not provided', () => {
    expect(() => assertNotNullOrUndefined(null)).to.throw(
      `Parameter must not be null or undefined.`,
    );
  });

  // 8. Проверка на предоставление пустой строки в качестве имени параметра
  it('should throw a generic error message for an empty string paramName', () => {
    expect(() => assertNotNullOrUndefined(null, '')).to.throw(
      `Parameter must not be null or undefined.`,
    );
  });

  // 9. Тест на взаимодействие с прототипами
  const objWithoutPrototype = Object.create(null);
  it('should not throw an error for an object without a prototype', () => {
    expect(() =>
      assertNotNullOrUndefined(objWithoutPrototype, 'testParam'),
    ).not.to.throw();
  });

  it('should throw an error with a long string', () => {
    const longString = 'a'.repeat(1000); // строка из 1000 символов 'a'
    expect(() => assertNotNullOrUndefined(null, longString)).to.throw();
  });

  it('should handle special characters in paramName', () => {
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    expect(() => assertNotNullOrUndefined(null, specialChars)).to.throw();
  });

  it('should not throw an error for NaN value', () => {
    expect(() => assertNotNullOrUndefined(NaN, 'NaNParam')).not.to.throw();
  });

  it('should not throw an error for function value', () => {
    const func = () => {};
    expect(() => assertNotNullOrUndefined(func, 'funcParam')).not.to.throw();
  });
});
