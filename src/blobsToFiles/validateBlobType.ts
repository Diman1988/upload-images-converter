import { IMimeTypes } from '@app/interfaces';

/**
 * Validates if the Blob's MIME type matches the expected type.
 *
 * @param {Blob} blob - The Blob to validate.
 * @param {IMimeTypes} expectedType - The expected MIME type.
 *
 * @throws {Error} - Throws an error if the Blob's type doesn't match the expected type.
 */
export const validateBlobType = (
  blob: Blob,
  expectedType: IMimeTypes,
): void => {
  if (blob.type !== expectedType) {
    throw new Error(
      `Blob type validation failed: got ${blob.type}, expected ${expectedType}`,
    );
  }
};
