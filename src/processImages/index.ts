import { assertIsNumber, assertIsPositiveNumber } from '../asserts';
import { drawImageOnCanvas } from '../drowImage';

export const processImages = async (
  file: File,
  correctWidth: number,
  correctHeight: number,
): Promise<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    assertIsNumber(correctWidth, 'correctWidth');
    assertIsNumber(correctHeight, 'correctHeight');

    assertIsPositiveNumber(correctWidth);
    assertIsPositiveNumber(correctHeight);

    const tempImg = new Image(); // Img should be created to read file
    tempImg.src = URL.createObjectURL(file); // Convert file to URL

    tempImg.onerror = (): void => reject(new Error('Image load error'));

    tempImg.onload = (): void => {
      try {
        const imageWidth = tempImg.width;
        const imageHeight = tempImg.height;
        const aspectRatio = imageWidth / imageHeight;
        const tempCanvas = document.createElement('canvas');

        let cropWidth, cropHeight, cropX, cropY;

        if (imageWidth > imageHeight) {
          cropWidth = Math.min(imageWidth, correctWidth * aspectRatio);
          cropHeight = cropWidth / aspectRatio;
          cropX = (imageWidth - cropWidth) / 2;
          cropY = (imageHeight - cropHeight) / 2;
        } else if (imageWidth === imageHeight) {
          cropWidth = correctWidth;
          cropHeight = correctHeight;
          cropX = 0;
          cropY = 0;
        } else {
          cropWidth = correctHeight * aspectRatio;
          cropHeight = cropWidth / aspectRatio;
          cropX = (imageWidth - cropWidth) / 2;
          cropY = (imageHeight - cropHeight) / 2;
        }

        tempCanvas.width = correctWidth;
        tempCanvas.height = correctHeight;

        drawImageOnCanvas(
          tempImg,
          tempCanvas,
          cropX,
          cropY,
          cropWidth,
          cropHeight,
          correctWidth,
          correctHeight,
        );

        URL.revokeObjectURL(tempImg.src);
        resolve(tempCanvas);
      } catch (error: any) {
        reject(new Error(`Image processing error: ${error.message}`));
      }
    };
  });
};
