/**
 * Calculates the Y-coordinate of the top-left corner of the cropped area based on the input image height and crop height.
 *
 * @param {number} imageHeight - The height of the original image.
 * @param {number} cropHeight - The height of the desired cropped area.
 * @param {boolean} isImageRatioLessThanTarget - A boolean flag indicating if the image's aspect ratio is less than the target aspect ratio.
 *                                              If true, the image is narrower than the target, and cropping will be based on width.
 *                                              If false, the image is wider or has the same aspect ratio as the target, and cropping will be based on height.
 *
 * @returns {number} - Returns the Y-coordinate of the top-left corner of the cropped area.
 */
export const calculateCropY = (
  imageHeight: number,
  cropHeight: number,
  isImageRatioLessThanTarget: boolean,
): number => (isImageRatioLessThanTarget ? (imageHeight - cropHeight) / 2 : 0);
