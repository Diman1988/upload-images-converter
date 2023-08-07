import { IMimeTypes } from '@app/interfaces';
import { validateBlobType } from './validateBlobType';
import { blobToFile } from './blobToFile';

/**
 * Converts an array of Blobs to an array of Files.
 *
 * @param {Blob[]} blobs - The array of Blobs to convert.
 * @param {IMimeTypes} format - The expected MIME type of the Blobs.
 * @param {boolean} showErrors - If true, throws an error when a Blob's type doesn't match the expected format.
 *
 * @returns {Promise<File[]>} - A promise that resolves with an array of Files.
 *
 * @throws {Error} - Throws an error if `showErrors` is true and a Blob's type doesn't match the `format`.
 */
export const blobsToFiles = async (
  blobs: Blob[],
  format: IMimeTypes,
  showErrors: boolean,
): Promise<File[]> => {
  return blobs.map((blob, i) => {
    if (showErrors) {
      validateBlobType(blob, format);
    }
    return blobToFile(blob, i, format);
  });
};
