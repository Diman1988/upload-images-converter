import { IMimeTypes, MimeTypesEnum } from '@app/interfaces';

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

/**
 * Asserts that each file in the FileList has a valid image type.
 *
 * @param {FileList} files - The list of files to be validated.
 *
 * @throws {Error} - Throws an error if any file's type is not a valid image type.
 */
export const assertIsValidImageType = (files: FileList): void => {
  const validFormats = Object.values(MimeTypesEnum);

  const invalidFiles = Array.from(files).filter(
    (file) => !validFormats.includes(file.type as MimeTypesEnum),
  );

  if (invalidFiles.length > 0) {
    throw new Error(
      `Invalid image types detected: ${invalidFiles
        .map((file) => file.type)
        .join(', ')}. Supported types are: ${validFormats.join(', ')}`,
    );
  }
};

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

/**
 * Asserts that the given value matches one of the supported MIME types (IMimeTypes).
 * If the value doesn't match any of the supported MIME types, the function throws an error.
 *
 * @param value - The MIME type string to be verified.
 *
 * @throws Will throw an error if the provided MIME type is not supported.
 */
export function assertIMimeTypes(value: string): asserts value is IMimeTypes {
  if (!Object.values(MimeTypesEnum).includes(value as MimeTypesEnum)) {
    throw new Error(`Unsupported format: ${value}`);
  }
}

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
