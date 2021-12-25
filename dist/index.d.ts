import { IMimeTypes } from './interfaces';
declare const imageConvert: (files: FileList | null, correctWidth?: number, correctHeight?: number, format?: IMimeTypes, showErrors?: boolean) => Promise<File[]>;
export { imageConvert };
