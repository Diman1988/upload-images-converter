import { ImageFormat } from "../constants";

export function assertIsPositiveNumber(value: any): asserts value is number {
  if (typeof value !== "number" || value <= 0) {
    throw new Error(`Expected a positive number, but received ${value}`);
  }
}

export function assertIsNumber(
  value: any,
  paramName: string
): asserts value is number {
  if (typeof value !== "number") {
    throw new Error(`Invalid input: ${paramName} must be a number`);
  }
}

export const assertIsValidImageType = (files: FileList): void => {
  const validFormats = Object.values(ImageFormat);

  const invalidFiles = Array.from(files).filter(
    (file) => !validFormats.includes(file.type as ImageFormat)
  );

  if (invalidFiles.length > 0) {
    throw new Error(
      `Invalid image types detected: ${invalidFiles
        .map((file) => file.type)
        .join(", ")}. Supported types are: ${validFormats.join(", ")}`
    );
  }
};
