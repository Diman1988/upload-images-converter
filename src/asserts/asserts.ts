import { ImageFormat } from '@app/constants';

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
  if (typeof value !== 'number') {
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
  const validFormats = Object.values(ImageFormat);

  const invalidFiles = Array.from(files).filter(
    (file) => !validFormats.includes(file.type as ImageFormat),
  );

  if (invalidFiles.length > 0) {
    throw new Error(
      `Invalid image types detected: ${invalidFiles
        .map((file) => file.type)
        .join(', ')}. Supported types are: ${validFormats.join(', ')}`,
    );
  }
};
