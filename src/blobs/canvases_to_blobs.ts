import { IMimeTypes } from '../interfaces';

const canvasesToBlobs = ( // Get blobs from canvases
  canvases: HTMLCanvasElement[],
  format: IMimeTypes,
): Promise<Blob[]> => {
  const promisesBlob: Promise<Blob>[] = [];

  canvases.forEach((canvas) => {
    promisesBlob.push(
      new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);

          reject(new Error('Blob with error'));
        }, format);
      }),
    );
  });

  return Promise.all(promisesBlob);
};

export { canvasesToBlobs };
  