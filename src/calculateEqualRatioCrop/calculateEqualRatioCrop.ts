import { CropResult } from '@app/interfaces';

/**
 * Function to calculate the crop dimensions for an image when the image aspect ratio is equal to the target aspect ratio.
 *
 * @param {number} imageWidth - The width of the original image.
 * @param {number} imageHeight - The height of the original image.
 * @param {number} targetWidth - The desired width of the cropped image.
 * @param {number} targetHeight - The desired height of the cropped image.
 * @param {boolean} isImageBiggerThanTarget - Flag indicating if the original image is bigger than the target dimensions.
 *
 * @returns {CropResult} - An object containing the calculated dimensions (x, y, width, and height) of the cropping area.
 */
export const calculateEqualRatioCrop = (
  imageWidth: number,
  imageHeight: number,
): CropResult => {
  return {
    cropX: 0,
    cropY: 0,
    cropWidth: imageWidth,
    cropHeight: imageHeight,
  };
};
