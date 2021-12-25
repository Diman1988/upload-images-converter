import { resizeFile } from './resize';
import { canvasesToBlobs } from './blobs';
import { IMimeTypes } from './interfaces';

const imageConvert = async (
  files: FileList | null,             // FileList object from input
  correctWidth = 500,                 // Width for output file
  correctHeight = 500,                // Height for output file
  format: IMimeTypes = 'image/webp',  // Format for output file (webp could be png for some browsers)
  showErrors = false,                 // Show in console convert format errors
): Promise<File[]> => {
  if (files) {
    const promises: Promise<HTMLCanvasElement>[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        // Create a promise for process an image
        const imgPromise: Promise<HTMLCanvasElement> = resizeFile(correctWidth, correctHeight, file);
        promises.push(imgPromise); // Add promise to array
      }
    }

    try {
      // Run promises from array to preccess images
      const newImages = await Promise.all(promises)
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
  } else {
    return [];
  }
};

export { imageConvert };
