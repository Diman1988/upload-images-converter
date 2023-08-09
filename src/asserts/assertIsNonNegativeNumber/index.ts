/**
 * Asserts that the provided value is a non-negative number.
 *
 * @param {unknown} value - The value to be validated.
 *
 * @throws {Error} - Throws an error if the value is not a non-negative number.
 */
export function assertIsNonNegativeNumber(
  value: unknown,
): asserts value is number {
  if (typeof value !== 'number') {
    throw new Error(`Expected a number, but received ${value}`);
  }

  if (value < 0) {
    throw new Error(`Expected a non-negative number, but received ${value}`);
  }

  // Проверка на Infinity или -Infinity
  if (!isFinite(value)) {
    throw new Error(`Expected a finite number, but received ${value}`);
  }

  // Проверка на NaN
  if (isNaN(value)) {
    throw new Error('Received NaN as value');
  }
}
