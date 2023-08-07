export type IMimeTypes =
  | 'image/webp'
  | 'image/jpeg'
  | 'image/jpg'
  | 'image/png';

export type ImageConverter = {
  files: FileList | null; // FileList object from input
  width: number; // Width for output file
  height: number; // Height for output file
  format: IMimeTypes; // Format for output file (webp could be png for some browsers)
  showErrors: boolean; // Show in console convert format errors
};

export type CropValues = {
  cropX: number;
  cropY: number;
  cropedWidth: number;
  cropedHeight: number;
};

export type CropResult = {
  cropX: number;
  cropY: number;
  cropWidth: number;
  cropHeight: number;
};

export type ScaledValues = {
  scaledWidth: number;
  scaledHeight: number;
};
