import { IMimeTypes } from '@app/interfaces';
import { canvasToBlob } from '../canvasToBlob';

/**
 * Asynchronously converts an array of HTML canvas elements into an array of Blobs.
 *
 * @param canvases - An array of HTMLCanvasElement objects that need to be converted to Blobs.
 * @param format - The desired output format for the Blobs (e.g., 'image/png', 'image/jpeg', etc.).
 *
 * @returns Promise that resolves with an array of Blob objects corresponding to the input canvases.
 * If the conversion of any canvas to a Blob fails, the Promise will be rejected with an Error.
 */
export const canvasesToBlobs = async (
  canvases: HTMLCanvasElement[],
  format: IMimeTypes,
): Promise<Blob[]> => {
  // Фильтруем canvases, чтобы убедиться, что все элементы не равны null или undefined
  const validCanvases = canvases.filter(Boolean);

  return Promise.all(
    validCanvases.map((canvas) => canvasToBlob(canvas, format)),
  );
};
