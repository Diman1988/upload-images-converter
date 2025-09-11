import { MimeTypesEnum } from '@app/interfaces';
import { ImageConverter } from '@app/imageConverter';

async function imageConverter({
  files,
  width,
  height,
  format,
  showErrors,
}: {
  files: FileList | File[] | null;
  width?: number;
  height?: number;
  format?: MimeTypesEnum;
  showErrors?: boolean;
}) {
  const converter = new ImageConverter({ width, height, format, showErrors });

  const result = await converter.convertImages(files);

  return result;
}

export { ImageConverter } from '@app/imageConverter';
export {
  IMimeTypes,
  IImageConverterOptions,
  MimeTypesEnum,
} from '@app/interfaces';

export { imageConverter };
