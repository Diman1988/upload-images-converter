import { resizeFile } from './resize/resize_file';
import { converter } from './converter/converter';
import { IMimeTypes } from './interfaces';

const imageConvert = (
  files: FileList | null,             // FileList object from input
  correctWidth = 500,                 // Width for output file
  correctHeight = 500,                // Height for output file
  format: IMimeTypes = 'image/webp',  // Format for output file (webp could be png for some browsers)
  showErrors = false,                 // Show in console convert format errors
): Promise<File[]> => {
  if (files) {
    const canvasPromises: Promise<HTMLCanvasElement>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        // Create a promise for process an image
        const canvasPromise: Promise<HTMLCanvasElement> = resizeFile(correctWidth, correctHeight, file);
        canvasPromises.push(canvasPromise); // Add promise to array
      }
    }

    return converter(canvasPromises, format, showErrors);
  }
  
  return Promise.reject([]);
};

export { imageConvert };
