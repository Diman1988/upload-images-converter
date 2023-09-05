import { IMimeTypes, MimeTypesEnum } from '@app/interfaces';

/**
 * Asserts that the given value matches one of the supported MIME types (IMimeTypes).
 * If the value doesn't match any of the supported MIME types, the function throws an error.
 *
 * @param value - The MIME type string to be verified.
 *
 * @throws Will throw an error if the provided MIME type is not supported.
 */
export function assertIMimeTypes(value: string): asserts value is IMimeTypes {
  if (!Object.values(MimeTypesEnum).includes(value as MimeTypesEnum)) {
    throw new Error(`Unsupported format: ${value}`);
  }
}
