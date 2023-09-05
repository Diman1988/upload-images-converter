/**
 * Prepares data for processing by converting the FileList to an array of Files.
 *
 * @param {FileList | null} files - The FileList containing selected files or null if no files were selected.
 * @returns {File[]} An array of Files extracted from the FileList, or an empty array if the input is null.
 */
export const prepareDataForProcessing = (
  files: FileList | File[] | null,
): File[] => {
  return files ? Array.from(files) : [];
};
