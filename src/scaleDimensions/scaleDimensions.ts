/**
 * Scale the dimensions of an image to fit within the specified maximum width and height while maintaining the aspect ratio.
 * @param {number} width - The original width of the image.
 * @param {number} height - The original height of the image.
 * @param {number} maxWidth - The maximum width to scale the image.
 * @param {number} maxHeight - The maximum height to scale the image.
 * @returns {{ width: number; height: number }} The scaled width and height of the image while maintaining the aspect ratio.
 */
export const scaleDimensions = (
  width: number,
  height: number,
  maxWidth: number,
  maxHeight: number,
): { width: number; height: number } => {
  // Calculate the scaling factor by taking the minimum of the width and height scaling ratios
  const scalingFactor = Math.min(maxWidth / width, maxHeight / height);

  // Calculate the scaled width and height while maintaining the aspect ratio
  return {
    width: Math.floor(width * scalingFactor),
    height: Math.floor(height * scalingFactor),
  };
};
