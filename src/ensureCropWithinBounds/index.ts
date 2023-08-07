/**
 * Clamps a given value between a specified minimum and maximum value.
 *
 * @param {number} value - The input value to be clamped.
 * @param {number} min - The lower boundary of the clamping range.
 * @param {number} max - The upper boundary of the clamping range.
 * @return {number} - The clamped value. If the input value is less than min, min will be returned. If the input value is greater than max, max will be returned. Otherwise, the input value will be returned.
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * The type definition for the parameters of a crop operation.
 */
type CropParameters = {
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
};

/**
 * Ensures that the parameters of a crop operation are within the bounds of the image.
 *
 * This function adjusts the cropping parameters so that the cropping operation does not go outside the bounds of the image. For example, it adjusts the parameters so that the cropping region does not start at a negative position or extend beyond the edge of the image.
 *
 * @param {number} imageWidth - The width of the image to be cropped.
 * @param {number} imageHeight - The height of the image to be cropped.
 * @param {CropParameters} params - An object containing the parameters of the crop operation.
 * @return {CropParameters} - An object containing the adjusted crop parameters. These parameters are guaranteed to be within the bounds of the image.
 */
export const ensureCropWithinBounds = (
  imageWidth: number,
  imageHeight: number,
  params: CropParameters,
): CropParameters => {
  let { cropX, cropY, cropWidth, cropHeight } = params;

  cropX = clamp(cropX, 0, imageWidth - cropWidth);
  cropY = clamp(cropY, 0, imageHeight - cropHeight);
  cropWidth = clamp(cropWidth, 0, imageWidth - cropX);
  cropHeight = clamp(cropHeight, 0, imageHeight - cropY);

  return {
    cropX,
    cropY,
    cropWidth,
    cropHeight,
  };
};
