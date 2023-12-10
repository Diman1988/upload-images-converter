import { assertIsValidImageType } from '@app/asserts';
import { blobsToFiles } from '@app/blobsToFiles';
import { canvasesToBlobs } from '@app/canvasesToBlobs';
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from '@app/constants';
import { IImageConverterOptions, MimeTypesEnum } from '@app/interfaces'; // Обратите внимание на интерфейс опций
import { prepareDataForProcessing } from '@app/prepareDataForProcessing';
import { processImages } from '@app/processImages';

class ImageConverter {
  protected width: number;

  protected height: number;

  protected format: MimeTypesEnum;

  protected showErrors: boolean;

  constructor(options?: IImageConverterOptions) {
    this.width = options?.width || DEFAULT_WIDTH;
    this.height = options?.height || DEFAULT_HEIGHT;
    this.format = options?.format || MimeTypesEnum.WEBP;
    this.showErrors = options?.showErrors || false;
  }

  protected async canvasesToBlobs(processedImages: HTMLCanvasElement[]) {
    const canvases = await canvasesToBlobs(processedImages, this.format);

    return canvases;
  }

  private prepare(files: FileList | File[]) {
    const preparedData = prepareDataForProcessing(files);

    return preparedData;
  }

  private async processImages(files: File[]) {
    const processedImages = await Promise.all(
      files.map((file) => processImages(file, this.width, this.height)),
    );

    return processedImages;
  }

  private async blobsToFiles(blobs: Blob[]) {
    const fileArray = await blobsToFiles(blobs, this.format, this.showErrors);

    return fileArray;
  }

  public async convertImages(files: FileList | File[] | null): Promise<File[]> {
    if (!files || files.length === 0) {
      return [];
    }

    assertIsValidImageType(files); // TODO: rename or remaster

    const preparedData = this.prepare(files);

    const processedImages = await this.processImages(preparedData);

    const blobs = await this.canvasesToBlobs(processedImages);

    const fileArray = await this.blobsToFiles(blobs);

    return fileArray;
  }
}

export { ImageConverter };
