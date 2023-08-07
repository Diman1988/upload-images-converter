/**
 * Draws a portion of an image on a canvas with the specified cropping and destination dimensions.
 *
 * @param {HTMLImageElement} img - The HTMLImageElement representing the source image to be drawn on the canvas.
 * @param {HTMLCanvasElement} canvas - The HTMLCanvasElement on which the image will be drawn.
 * @param {number} cropX - The X-coordinate of the top-left corner of the portion of the image to be cropped.
 * @param {number} cropY - The Y-coordinate of the top-left corner of the portion of the image to be cropped.
 * @param {number} cropWidth - The width of the portion of the image to be cropped.
 * @param {number} cropHeight - The height of the portion of the image to be cropped.
 * @param {number} destinationWidth - The width of the destination area on the canvas where the cropped image will be drawn.
 * @param {number} destinationHeight - The height of the destination area on the canvas where the cropped image will be drawn.
 */
export const drawImageOnCanvas = (
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  cropX: number,
  cropY: number,
  cropWidth: number,
  cropHeight: number,
  destinationWidth: number,
  destinationHeight: number,
) => {
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  ctx.drawImage(
    img,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    destinationWidth,
    destinationHeight,
  );
};
