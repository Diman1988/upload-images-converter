import { assertIsBoolean, assertIsNonNegativeNumber } from '@app/asserts';

/**
 * Calculates the width of the cropped area based on the input image dimensions and target aspect ratio.
 *
 * @param {number} imageWidth - The width of the original image.
 * @param {number} imageHeight - The height of the original image.
 * @param {number} targetRatio - The desired aspect ratio (width/height) of the cropped area.
 * @param {boolean} isImageRatioLessThanTarget - A boolean flag indicating if the image's aspect ratio is less than the target aspect ratio.
 *                                              If true, the image is narrower than the target, and cropping will be based on width.
 *                                              If false, the image is wider or has the same aspect ratio as the target, and cropping will be based on height.
 *
 * @returns {number} - Returns the calculated width of the cropped area.
 */
export const calculateCropWidth = (
  imageWidth: number,
  imageHeight: number,
  targetRatio: number,
  isImageRatioLessThanTarget: boolean,
): number => {
  assertIsNonNegativeNumber(imageWidth);
  assertIsNonNegativeNumber(imageHeight);
  assertIsNonNegativeNumber(targetRatio);
  assertIsBoolean(isImageRatioLessThanTarget, 'isImageRatioLessThanTarget');

  // If the image's aspect ratio is less than the target aspect ratio, cropping will be based on width.
  return isImageRatioLessThanTarget
    ? imageWidth
    : Math.round(imageHeight * targetRatio); // Otherwise, the image is wider or has the same aspect ratio as the target, so calculate the crop width based on height.
};
