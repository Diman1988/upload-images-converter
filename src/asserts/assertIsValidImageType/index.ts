import { MimeTypesEnum } from '@app/interfaces';

/**
 * Asserts that each file in the FileList has a valid image type.
 *
 * @param {FileList} files - The list of files to be validated.
 *
 * @throws {Error} - Throws an error if any file's type is not a valid image type.
 */
export const assertIsValidImageType = (files: FileList): void => {
  const validFormats = Object.values(MimeTypesEnum);

  const invalidFiles = Array.from(files).filter(
    (file) => !validFormats.includes(file.type as MimeTypesEnum),
  );

  if (invalidFiles.length > 0) {
    throw new Error(
      `Invalid image types detected: ${invalidFiles
        .map((file) => file.type)
        .join(', ')}. Supported types are: ${validFormats.join(', ')}`,
    );
  }
};
