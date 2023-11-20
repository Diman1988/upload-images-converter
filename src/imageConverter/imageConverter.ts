import { assertIsValidImageType } from '@app/asserts';
import { blobsToFiles } from '@app/blobsToFiles';
import { canvasesToBlobs } from '@app/canvasesToBlobs';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '@app/constants';
import { IImageConverterOptions, MimeTypesEnum } from '@app/interfaces'; // Обратите внимание на интерфейс опций
import { prepareDataForProcessing } from '@app/prepareDataForProcessing';
import { processImages } from '@app/processImages';

class ImageConverter {
  private width: number;
  private height: number;
  private format: MimeTypesEnum;
  private showErrors: boolean;

  constructor(options?: IImageConverterOptions) {
    this.width = options?.width || DEFAULT_WIDTH;
    this.height = options?.height || DEFAULT_HEIGHT;
    this.format = options?.format || MimeTypesEnum.WEBP;
    this.showErrors = options?.showErrors || false;
  }

  public async convertImages(files: FileList | File[]): Promise<File[]> {
    if (!files || files.length === 0) {
      return [];
    }

    assertIsValidImageType(files);

    const preparedData = prepareDataForProcessing(files);

    const processedImages = await Promise.all(
      preparedData.map(file => processImages(file, this.width, this.height))
    );

    const blobs = await canvasesToBlobs(processedImages, this.format);

    const fileArray = await blobsToFiles(blobs, this.format, this.showErrors);

    return fileArray;
  }
}

export { ImageConverter };
