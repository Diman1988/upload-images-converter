// export type IMimeTypes =
//   | 'image/webp'
//   | 'image/jpeg'
//   | 'image/png';

// TODO: rename later
export enum MimeTypesEnum {
  WEBP = 'image/webp',
  AVIF = 'image/avif',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
}

export type IMimeTypesKeys = keyof typeof MimeTypesEnum;

export type IMimeTypes = (typeof MimeTypesEnum)[keyof typeof MimeTypesEnum];

export type ImageConverter = {
  files: FileList | File[] | null; // FileList object from input
  width?: number; // Width for an output file (optional, defaults to DEFAULT_WIDTH)
  height?: number; // Height for an output file (optional, defaults to DEFAULT_HEIGHT)
  format?: IMimeTypes; // Format for an output file (optional, defaults to WebP)
  showErrors?: boolean; // Show in console convert format errors (optional, defaults to false)
};

export type CropValues = {
  cropX: number;
  cropY: number;
  croppedWidth: number;
  croppedHeight: number;
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
