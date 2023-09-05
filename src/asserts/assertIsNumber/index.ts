/**
 * Asserts that the provided value is a number.
 *
 * @param {unknown} value - The value to be validated.
 * @param {string} paramName - The name of the parameter for error message.
 *
 * @throws {Error} - Throws an error if the value is not a number.
 */
export function assertIsNumber(
  value: unknown,
  paramName: string,
): asserts value is number {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new Error(`Invalid input: ${paramName} must be a number`);
  }
}
