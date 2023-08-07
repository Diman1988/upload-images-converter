import { IMimeTypes } from '@app/interfaces';

/**
 * Asynchronously converts an array of HTML canvas elements into an array of Blobs.
 *
 * @param {HTMLCanvasElement[]} canvases - An array of HTMLCanvasElement objects that need to be converted to Blobs.
 * @param {IMimeTypes} format - The desired output format for the Blobs (e.g., 'image/png', 'image/jpeg', etc.).
 *
 * @returns {Promise<Blob[]>} - Returns a Promise that resolves with an array of Blob objects corresponding to the input canvases.
 * If conversion of any canvas to a Blob fails, the Promise will be rejected with an Error.
 */
export const canvasesToBlobs = async (
  canvases: HTMLCanvasElement[],
  format: IMimeTypes,
): Promise<Blob[]> => {
  // Map each canvas to a Promise that will resolve with the Blob for that canvas.
  const promises: Promise<Blob>[] = canvases.map(
    (canvas) =>
      new Promise((resolve, reject) => {
        // Convert the canvas to a Blob.
        canvas.toBlob((blob) => {
          // If the blob was created successfully, resolve the Promise with the Blob.
          if (blob) {
            resolve(blob);
          } else {
            // If there was an error creating the Blob, reject the Promise with an Error.
            reject(new Error('Blob creation error'));
          }
        }, format);
      }),
  );

  // Return a Promise that will resolve when all of the individual canvas-to-Blob Promises have resolved.
  return Promise.all(promises);
};
