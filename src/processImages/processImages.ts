import { assertIsNumber, assertIsPositiveNumber } from '@app/asserts';
import { calculate } from '@app/calculate';
import { drawImageOnCanvas } from '@app/drawImageOnCanvas';
import { scaleImage } from '@app/resizeAndCropImage/scaleImage';

/**
 * Process an image file by resizing, cropping, and drawing it on a canvas.
 * @param {File} file - The input image file to process.
 * @param {number} width - The desired width for the processed image.
 * @param {number} height - The desired height for the processed image.
 * @returns {Promise<HTMLCanvasElement>} A promise that resolves with the processed image as a canvas element.
 */
export const processImages = async (
  file: File,
  width: number,
  height: number,
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    // Validate input parameters
    assertIsNumber(width, 'correctWidth');
    assertIsNumber(height, 'correctHeight');
    assertIsPositiveNumber(width);
    assertIsPositiveNumber(height);

    // Create a temporary image element to read the file
    const tempImg = new Image();
    tempImg.src = URL.createObjectURL(file); // Convert file to URL

    // Handle image load error
    tempImg.onerror = (): void => reject(new Error('Image load error'));

    // Handle image load success
    tempImg.onload = (): void => {
      try {
        // Create a canvas element to draw the processed image
        const canvas = document.createElement('canvas');

        // Get the original dimensions of the image
        const imageWidth = tempImg.width;
        const imageHeight = tempImg.height;

        // Set the dimensions of the canvas to the desired output size
        canvas.width = width;
        canvas.height = height;

        // Calculate the crop parameters based on the original and target dimensions
        const { cropX, cropY, cropWidth, cropHeight } = calculate(
          imageWidth,
          imageHeight,
          width,
          height,
        );

        // Calculate the scaled dimensions for the cropped image
        const { scaledWidth, scaledHeight } = scaleImage(
          cropWidth,
          cropHeight,
          width,
          height,
        );

        // Draw the cropped and scaled image on the canvas
        drawImageOnCanvas(
          tempImg,
          canvas,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          scaledWidth,
          scaledHeight,
        );

        // Release resources associated with the temporary image URL
        URL.revokeObjectURL(tempImg.src);

        // Resolve the promise with the processed canvas
        resolve(canvas);
      } catch (error: any) {
        // Reject the promise if any error occurs during image processing
        reject(new Error(`Image processing error: ${error.message}`));
      }
    };
  });
};
