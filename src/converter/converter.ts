import { canvasesToBlobs } from '../blobs/canvases_to_blobs';
import { IMimeTypes } from '../interfaces';

const converter = async (
  canvasPromises: Promise<HTMLCanvasElement>[],
  format: IMimeTypes = 'image/webp',  // Format for output file (webp could be png for some browsers)
  showErrors = false,                 // Show in console convert format errors
): Promise<File[]> => {
  try {
    // Run promises from array to preccess images
    const newImages = await Promise.all(canvasPromises)
      .then((canvases) => canvasesToBlobs(canvases, format)) // Converting to blob with format
      .then(blobs => {
        const fileArray = [] as File[]; // Temp array for make list of images (FileList emulator but not readonly)

        for (let i = 0; i < blobs.length; i++) {
          const type = format.substring(format.indexOf('/') + 1);
          const file = new File([blobs[i] as Blob], `image_${i}.${type}`, { type: format });

          if (showErrors && blobs[i].type !== type) {
            console.error(`converted to ${blobs[i].type}, expected ${type}`);
          }
          fileArray.push(file);
        }

        return fileArray;
      });
    
    return newImages;
  } catch (error) {
    throw new Error(`Something wrong with files, error message: ${error}`);
  }
};

export { converter };
