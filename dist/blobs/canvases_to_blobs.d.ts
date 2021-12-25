import { IMimeTypes } from '../interfaces';
declare const canvasesToBlobs: (canvases: HTMLCanvasElement[], format: IMimeTypes) => Promise<Blob[]>;
export { canvasesToBlobs };
