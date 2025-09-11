import { IMimeTypes } from '@app/interfaces';

/**
 * Converts a Blob to a File.
 *
 * @param {Blob} blob - The Blob to convert.
 * @param {number} index - The index of the Blob, used to create a unique filename.
 * @param {IMimeTypes} format - The expected MIME type of the Blob.
 *
 * @returns {File} - The converted File.
 *
 * @throws {Error} - Throws an error if Blob's type doesn't match the `format`.
 */
export const blobToFile = (
  blob: Blob,
  index: number,
  format: IMimeTypes,
): File => {
  // Map MIME types to proper file extensions
  const extensionMap: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  };

  const extension =
    extensionMap[format] || format.substring(format.indexOf('/') + 1);
  const uniqueId = Date.now() + index;

  return new File([blob], `image_${uniqueId}.${extension}`, { type: format });
};
