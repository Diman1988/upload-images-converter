import { MimeTypesEnum } from '@app/interfaces';
import { ImageConverter } from './imageConverter/imageConverter';

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
export { IMimeTypes, IImageConverterOptions } from '@app/interfaces';

export { imageConverter };
