import { assertIsNonNegativeNumber } from '@app/asserts';

/**
 * Calculates the X-coordinate of the top-left corner of the cropped area based on the input image width and crop width.
 *
 * @param {number} imageWidth - The width of the original image.
 * @param {number} cropWidth - The width of the desired cropped area.
 * @param {boolean} isImageRatioLessThanTarget - A boolean flag indicating if the image's aspect ratio is less than the target aspect ratio.
 *                                              If true, the image is narrower than the target, and cropping will be based on width.
 *                                              If false, the image is wider or has the same aspect ratio as the target, and cropping will be based on height.
 *
 * @returns {number} - Returns the X-coordinate of the top-left corner of the cropped area.
 */
export const calculateCropX = (
  imageWidth: number,
  cropWidth: number,
  isImageRatioLessThanTarget: boolean,
): number => {
  assertIsNonNegativeNumber(imageWidth);
  assertIsNonNegativeNumber(cropWidth);

  if (imageWidth === 0) {
    return 0;
  }

  return isImageRatioLessThanTarget ? 0 : (imageWidth - cropWidth) / 2;
};
