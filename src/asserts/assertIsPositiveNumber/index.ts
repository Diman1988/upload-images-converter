/**
 * Asserts that the provided value is a positive number.
 *
 * @param {unknown} value - The value to be validated.
 *
 * @throws {Error} - Throws an error if the value is not a positive number.
 */
export function assertIsPositiveNumber(
  value: unknown,
): asserts value is number {
  if (typeof value !== 'number' || value <= 0) {
    throw new Error(`Expected a positive number, but received ${value}`);
  }
}
