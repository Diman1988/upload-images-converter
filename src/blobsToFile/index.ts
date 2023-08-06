import { IMimeTypes } from "../interfaces";

export const blobsToFiles = async (
  blobs: Blob[],
  format: IMimeTypes,
  showErrors: boolean
): Promise<File[]> => {
  const type = format.substring(format.indexOf("/") + 1);

  const fileArray = blobs.map((blob, i) => {
    if (showErrors && blob.type !== format) {
      console.error(`converted to ${blob.type}, expected ${format}`);
    }
    return new File([blob], `image_${i}.${type}`, { type: format });
  });

  return fileArray;
};
