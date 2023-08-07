/**
 * Calculates the height of the cropped area based on the input image dimensions and target aspect ratio.
 *
 * @param {number} imageWidth - The width of the original image.
 * @param {number} imageHeight - The height of the original image.
 * @param {number} targetRatio - The desired aspect ratio (width/height) of the cropped area.
 * @param {boolean} isImageRatioLessThanTarget - A boolean flag indicating if the image's aspect ratio is less than the target aspect ratio.
 *                                              If true, the image is narrower than the target, and cropping will be based on width.
 *                                              If false, the image is wider or has the same aspect ratio as the target, and cropping will be based on height.
 *
 * @returns {number} - Returns the calculated height of the cropped area.
 */
export const calculateCropHeight = (
  imageWidth: number,
  imageHeight: number,
  targetRatio: number,
  isImageRatioLessThanTarget: boolean,
): number =>
  // If the image's aspect ratio is less than the target aspect ratio, calculate the crop height based on width.
  isImageRatioLessThanTarget
    ? Math.round(imageWidth / targetRatio)
    : imageHeight; // Otherwise, the image is wider or has the same aspect ratio as the target, so cropping will be based on height.
