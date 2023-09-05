import {
  calculateCropWidth,
  calculateCropHeight,
  calculateCropX,
  calculateCropY,
} from '@app/cropFunctions';
import { CropResult } from '@app/interfaces';

/**
 * Function to calculate the crop dimensions for an image when the image aspect ratio is not equal to the target aspect ratio.
 *
 * @param {number} imageWidth - The width of the original image.
 * @param {number} imageHeight - The height of the original image.
 * @param {number} targetRatio - The desired aspect ratio of the cropped image.
 * @param {number} imageRatio - The aspect ratio of the original image.
 *
 * @returns {CropResult} - An object containing the calculated dimensions (x, y, width, and height) of the cropping area.
 */
export const calculateNonEqualRatioCrop = (
  imageWidth: number,
  imageHeight: number,
  targetRatio: number,
  imageRatio: number,
): CropResult => {
  const isImageRatioLessThanTarget = imageRatio < targetRatio;

  const cropWidth = calculateCropWidth(
    imageWidth,
    imageHeight,
    targetRatio,
    isImageRatioLessThanTarget,
  );
  const cropHeight = calculateCropHeight(
    imageWidth,
    imageHeight,
    targetRatio,
    isImageRatioLessThanTarget,
  );
  const cropX = calculateCropX(
    imageWidth,
    cropWidth,
    isImageRatioLessThanTarget,
  );
  const cropY = calculateCropY(
    imageHeight,
    cropHeight,
    isImageRatioLessThanTarget,
  );

  return {
    cropX,
    cropY,
    cropWidth,
    cropHeight,
  };
};
