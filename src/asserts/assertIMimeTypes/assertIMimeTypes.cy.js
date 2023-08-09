import { assertIMimeTypes } from './';

describe('assertIMimeTypes function', () => {
  it('should not throw an error for supported formats', () => {
    const supportedFormats = [
      'image/webp',
      'image/jpeg',
      'image/jpg',
      'image/png',
    ];

    supportedFormats.forEach((format) => {
      expect(() => assertIMimeTypes(format)).not.to.throw();
    });
  });

  it('should throw an error for unsupported formats', () => {
    const unsupportedFormats = ['image/gif', 'audio/mp3', 'text/plain'];

    unsupportedFormats.forEach((format) => {
      expect(() => assertIMimeTypes(format)).to.throw(
        `Unsupported format: ${format}`,
      );
    });
  });
});
