import {
  assertIsValidImageType,
  assertIsNumber,
  assertIsPositiveNumber,
} from '@app/asserts';
import { blobsToFiles } from '@app/blobsToFiles';
import { canvasesToBlobs } from '@app/canvasesToBlobs';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '@app/constants';
import { ImageConverter, MimeTypesEnum } from '@app/interfaces';
import { prepareDataForProcessing } from '@app/prepareDataForProcessing';
import { processImages } from '@app/processImages';

/**
 * Convert images based on provided options.
 *
 * @param files - FileList object from input
 * @param width - Width for output file (defaults to DEFAULT_WIDTH)
 * @param height - Height for output file (defaults to DEFAULT_HEIGHT)
 * @param format - Format for output file (defaults to WebP)
 * @param showErrors - If true, will show errors in console (defaults to false)
 *
 * @returns An array of processed files.
 */
export const imageConverter = async ({
  files,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  format = MimeTypesEnum.WEBP,
  showErrors = false,
}: ImageConverter): Promise<File[]> => {
  if (!files) {
    return [];
  }

  // Validate parameters once at the top level
  assertIsNumber(width, 'width');
  assertIsNumber(height, 'height');
  assertIsPositiveNumber(width);
  assertIsPositiveNumber(height);

  // At this point files is guaranteed to be non-null
  assertIsValidImageType(files);

  const preparedData = prepareDataForProcessing(files);

  const processedImages = await Promise.all(
    preparedData.map((file) => processImages(file, width, height)),
  );

  const blobs = await canvasesToBlobs(processedImages, format);

  const fileArray = blobsToFiles(blobs, format, showErrors);

  return fileArray;
};
