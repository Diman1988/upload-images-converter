declare type IMimeTypes = "image/webp" | "image/jpeg" | "image/jpg" | "image/png";
declare const imageConvert: (files: FileList | null, correctWidth?: number, correctHeight?: number, format?: IMimeTypes, showErrors?: boolean) => Promise<File[]>;
export { imageConvert };
