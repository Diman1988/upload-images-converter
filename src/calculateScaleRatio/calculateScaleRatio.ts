/**
 * Calculate the scale ratio needed to fit the crop dimensions within the target dimensions.
 * @param {number} cropWidth - The width of the crop area.
 * @param {number} cropHeight - The height of the crop area.
 * @param {number} targetWidth - The target width to fit the crop area into.
 * @param {number} targetHeight - The target height to fit the crop area into.
 * @returns {number} The scale ratio needed to fit the crop dimensions within the target dimensions.
 */
export const calculateScaleRatio = (
  cropWidth: number,
  cropHeight: number,
  targetWidth: number,
  targetHeight: number,
): number => {
  if (cropWidth === 0 || cropHeight === 0) {
    return 0;
  }

  if (targetWidth === 0 || targetHeight === 0) {
    return 0;
  }

  // Calculate the scale ratio by taking the maximum of the width and height scaling ratios
  return Math.max(targetWidth / cropWidth, targetHeight / cropHeight);
};
