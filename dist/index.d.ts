declare type IMimoTypes = "image/webp" | "image/jpeg" | "image/jpg" | "image/png";
declare const imageConvert: (files: FileList, correctWidth?: number, correctHeight?: number, format?: IMimoTypes) => Promise<File[]>;
export { imageConvert };
