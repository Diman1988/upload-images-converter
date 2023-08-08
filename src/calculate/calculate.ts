/**
 * Asserts if the given value is a positive number.
 *
 * @param {number} value - The value to be checked.
 * @throws {Error} - If the value is not a positive number.
 */
import { assertIsPositiveNumber } from '@app/asserts';

/**
 * Calculates the crop dimensions of an image given its width and height, and the target width and height.
 */
import { calculateCropDimensions } from '@app/calculateCropDimensions';

/**
 * Calculates the aspect ratio of a given width and height.
 */
import { calculateRatio } from '@app/calculateRatio';

/**
 * Ensures that the calculated crop dimensions are within the bounds of the image.
 */
import { ensureCropWithinBounds } from '@app/ensureCropWithinBounds';

/**
 * The type definition for the result of a crop operation.
 */
import { CropResult } from '@app/interfaces';

/**
 * Performs crop calculation on an image given its dimensions and target dimensions.
 *
 * This function performs several steps in order to calculate the crop parameters:
 * 1. Asserts that the input parameters are positive numbers.
 * 2. Calculates the aspect ratios of the image and target.
 * 3. Calculates the initial crop parameters based on the image and target dimensions, and their aspect ratios.
 * 4. Corrects the calculated crop parameters to ensure they are within the bounds of the image.
 * 5. Floors the corrected crop parameters to avoid fractional pixel values.
 *
 * @param {number} imageWidth - The width of the image to be cropped.
 * @param {number} imageHeight - The height of the image to be cropped.
 * @param {number} targetWidth - The width of the target output.
 * @param {number} targetHeight - The height of the target output.
 * @return {CropResult} - An object containing the final calculated crop parameters.
 */
export const calculate = (
  imageWidth: number,
  imageHeight: number,
  targetWidth: number,
  targetHeight: number,
): CropResult => {
  assertIsPositiveNumber(imageWidth);
  assertIsPositiveNumber(imageHeight);
  assertIsPositiveNumber(targetWidth);
  assertIsPositiveNumber(targetHeight);

  const imageRatio = calculateRatio(imageWidth, imageHeight);
  const targetRatio = calculateRatio(targetWidth, targetHeight);

  const cropResult = calculateCropDimensions(
    imageWidth,
    imageHeight,
    targetWidth,
    targetHeight,
    targetRatio,
    imageRatio,
  );

  const correctedCrop = ensureCropWithinBounds(
    imageWidth,
    imageHeight,
    cropResult,
  );

  return {
    cropX: Math.floor(correctedCrop.cropX),
    cropY: Math.floor(correctedCrop.cropY),
    cropWidth: Math.floor(correctedCrop.cropWidth),
    cropHeight: Math.floor(correctedCrop.cropHeight),
  };
};
