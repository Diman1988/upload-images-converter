import { validateBlobType } from './../../../../src/blobsToFiles';

describe('validateBlobType', () => {
  it('should throw an error when the Blob type does not match the expected type', () => {
    const blob = new Blob([], { type: 'image/png' });
    expect(() => validateBlobType(blob, 'image/jpg')).to.throw(
      `Blob type validation failed: got image/png, expected image/jpg`,
    );
  });

  it('should throw an error when the Blob type does not match the expected type', () => {
    const blob = new Blob([], { type: 'image/png' });
    expect(() => validateBlobType(blob, 'image/jpeg')).to.throw(
      `Blob type validation failed: got image/png, expected image/jpeg`,
    );
  });

  it('should throw an error when the Blob type does not match the expected type', () => {
    const blob = new Blob([], { type: 'image/png' });
    expect(() => validateBlobType(blob, 'image/webp')).to.throw(
      `Blob type validation failed: got image/png, expected image/webp`,
    );
  });

  it('should not throw an error when the Blob type matches the expected type', () => {
    const blob = new Blob([], { type: 'image/png' });
    expect(() => validateBlobType(blob, 'image/png')).not.to.throw();
  });
});
