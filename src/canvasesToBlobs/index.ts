import { IMimeTypes } from '../interfaces';

export const canvasesToBlobs = async (
  canvases: HTMLCanvasElement[],
  format: IMimeTypes,
): Promise<Blob[]> => {
  const promises: Promise<Blob>[] = canvases.map(
    (canvas) =>
      new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Blob creation error'));
          }
        }, format);
      }),
  );

  return Promise.all(promises);
};
