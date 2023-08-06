import { assertIsValidImageType } from './../asserts';
import { blobsToFiles } from './../blobsToFile';
import { canvasesToBlobs } from './../canvasesToBlobs';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT, ImageFormat } from './../constants';
import { ImageConverter } from './../interfaces';
import { prepareDataForProcessing } from './../prepareDataForProcessing';
import { processImages } from './../processImages';

/**
 * Convert images based on provided options.
 *
 * @param files - FileList object from input
 * @param width - Width for output file. Default is DEFAULT_WIDTH.
 * @param height - Height for output file. Default is DEFAULT_HEIGHT.
 * @param format - Format for output file. Default is webp (could be png for some browsers).
 * @param showErrors - If true, will show errors in console. Default is false.
 *
 * @returns An array of processed files.
 */
export const imageConvert = async ({
  files,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  format = ImageFormat.webp,
  showErrors = false,
}: ImageConverter): Promise<File[]> => {
  if (!files) {
    return [];
  }

  assertIsValidImageType(files);

  const preparedData = prepareDataForProcessing(files);

  const processedImages = await Promise.all(
    preparedData.map((file) => processImages(file, width, height)),
  );

  const blobs = await canvasesToBlobs(processedImages, format);

  const fileArray = await blobsToFiles(blobs, format, showErrors);

  return fileArray;
};
