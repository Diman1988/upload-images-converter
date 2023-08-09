/**
 * Asserts that a given value is neither null nor undefined.
 *
 * @param {unknown} value - The value to be checked.
 * @param {string} paramName - The name of the parameter or variable being checked.
 * This will be included in the error message for better context when an error is thrown.
 *
 * @throws {Error} Throws an error if the value is null or undefined, indicating that the parameter
 * with the provided name should not have a null or undefined value.
 */
export function assertNotNullOrUndefined(
  value: unknown,
  paramName = 'Parameter',
): void {
  if (!paramName) {
    paramName = 'Parameter';
  }

  if (value === null || value === undefined) {
    throw new Error(`${paramName} must not be null or undefined.`);
  }
}
