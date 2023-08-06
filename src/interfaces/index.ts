export type IMimeTypes =
  | "image/webp"
  | "image/jpeg"
  | "image/jpg"
  | "image/png";

export type ImageConverter = {
  files: FileList | null; // FileList object from input
  width: number; // Width for output file
  height: number; // Height for output file
  format: IMimeTypes; // Format for output file (webp could be png for some browsers)
  showErrors: boolean; // Show in console convert format errors
};
