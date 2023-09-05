import { calculateScaleRatio } from '@app/calculateScaleRatio';
import { ScaledValues } from '@app/interfaces';

/**
 * Scales the image to the target size, maintaining aspect ratio.
 *
 * @param {number} cropWidth - Width of the cropped image
 * @param {number} cropHeight - Height of the cropped image
 * @param {number} targetWidth - Target width for the image
 * @param {number} targetHeight - Target height for the image
 *
 * @returns {ScaledValues} - An object containing the width and height of the scaled image.
 * If the cropped image is smaller than the target, the image is scaled up to the target size.
 * Otherwise, the image dimensions are set to the target values.
 */
export const scaleImage = (
  cropWidth: number,
  cropHeight: number,
  targetWidth: number,
  targetHeight: number,
): ScaledValues => {
  let scaledWidth = targetWidth;
  let scaledHeight = targetHeight;

  if (cropWidth < targetWidth && cropHeight < targetHeight) {
    const scaleRatio = calculateScaleRatio(
      cropWidth,
      cropHeight,
      targetWidth,
      targetHeight,
    );
    scaledWidth = cropWidth * scaleRatio;
    scaledHeight = cropHeight * scaleRatio;
  }

  return {
    scaledWidth: Math.floor(scaledWidth),
    scaledHeight: Math.floor(scaledHeight),
  };
};
