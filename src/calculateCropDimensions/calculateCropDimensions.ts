import { calculateEqualRatioCrop } from '@app/calculateEqualRatioCrop';
import { calculateNonEqualRatioCrop } from '@app/calculateNonEqualRatioCrop';
import { CropResult } from '@app/interfaces';

/**
 * Function to calculate the crop dimensions for an image given the target dimensions and aspect ratios.
 *
 * @param {number} imageWidth - The width of the original image.
 * @param {number} imageHeight - The height of the original image.
 * @param {number} targetWidth - The desired width of the cropped image.
 * @param {number} targetHeight - The desired height of the cropped image.
 * @param {number} targetRatio - The aspect ratio (width/height) of the target dimensions.
 * @param {number} imageRatio - The aspect ratio (width/height) of the original image.
 *
 * @returns {CropResult} - An object containing the calculated dimensions (x, y, width, and height) of the cropping area.
 */
export const calculateCropDimensions = (
  imageWidth: number,
  imageHeight: number,
  targetRatio: number,
  imageRatio: number,
): CropResult => {
  const isImageRatioEqual = Math.abs(imageRatio - targetRatio) < 0.01;

  return isImageRatioEqual
    ? calculateEqualRatioCrop(imageWidth, imageHeight)
    : calculateNonEqualRatioCrop(
        imageWidth,
        imageHeight,
        targetRatio,
        imageRatio,
      );
};
