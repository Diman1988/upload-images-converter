/**
 * Calculates the aspect ratio of an image based on its width and height.
 *
 * @param {number} imageWidth - The width of the image.
 * @param {number} imageHeight - The height of the image.
 *
 * @returns {number} - The aspect ratio of the image. This is calculated as width/height.
 */
export const calculateRatio = (
  imageWidth: number,
  imageHeight: number,
): number => {
  const imageRatio = imageWidth / imageHeight;
  return imageRatio;
};
