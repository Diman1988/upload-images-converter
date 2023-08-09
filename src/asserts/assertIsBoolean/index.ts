/**
 * Asserts that the provided value is a boolean.
 *
 * @param {unknown} value - The value to be validated.
 * @param {string} paramName - The name of the parameter for the error message.
 *
 * @throws {Error} - Throws an error if the value is not a boolean.
 */
export function assertIsBoolean(
  value: unknown,
  paramName: string,
): asserts value is boolean {
  if (typeof value !== 'boolean') {
    throw new Error(`Invalid input: ${paramName} must be a boolean`);
  }
}
