import { assertIMimeTypes, assertNotNullOrUndefined } from '@app/asserts';
import { IMimeTypes } from '@app/interfaces';

class CanvasConverter {
  /**
   * Converts an HTML canvas element to a Blob asynchronously.
   *
   * @param canvas - The HTMLCanvasElement object that needs to be converted to a Blob.
   * @param format - The desired output format for the Blob (e.g., 'image/png', 'image/jpeg', etc.).
   *
   * @returns Promise that resolves with a Blob object corresponding to the input canvas.
   * If the conversion fails, the Promise will be rejected with an Error.
   */
  public canvasToBlob(
    canvas: HTMLCanvasElement,
    format: IMimeTypes,
  ): Promise<Blob> {
    return new Promise((resolve, reject) => {
      // Try to assert the MIME type
      try {
        assertIMimeTypes(format);
        assertNotNullOrUndefined(canvas, 'Canvas');
      } catch (error) {
        return reject(error);
      }

      if (!canvas.toBlob) {
        return reject(
          new Error('Method canvas.toBlob is not supported by this browser.'),
        );
      }

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(
            new Error(
              `Failed to convert canvas to blob with format: ${format}`,
            ),
          );
        }
      }, format);
    });
  }
}

export { CanvasConverter };
