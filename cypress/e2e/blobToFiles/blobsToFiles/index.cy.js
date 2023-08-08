import { blobsToFiles } from './../../../../src/blobsToFiles';

describe('blobsToFiles', () => {
  it('should return an array of Files with the correct type and content', () => {
    const blobs = [
      new Blob(['test content 1'], { type: 'image/png' }),
      new Blob(['test content 2'], { type: 'image/png' }),
    ];
    blobsToFiles(blobs, 'image/png', true).then((files) => {
      expect(files).to.be.an('array').that.has.lengthOf(2);

      files.forEach((file, index) => {
        expect(file).to.be.an.instanceof(File);
        expect(file.type).to.eq('image/png');
        expect(file.name).to.match(/^image_\d+\.png$/);
        return file
          .text()
          .then((text) => expect(text).to.eq(`test content ${index + 1}`));
      });
    });
  });

  it('should handle an empty array of blobs correctly', () => {
    const blobs = [];
    blobsToFiles(blobs, 'image/png', true).then((files) => {
      expect(files).to.be.an('array').that.is.empty;
    });
  });

  it('should throw an error when showErrors is true and the Blob type does not match the format', () => {
    const blobs = [new Blob(['test content'], { type: 'image/jpeg' })];
    blobsToFiles(blobs, 'image/png', true)
      .then(() => {
        throw new Error('This should not be called');
      })
      .catch((err) => {
        expect(err).to.exist;
      });
  });

  it('should not throw an error when showErrors is false and the Blob type does not match the format', () => {
    const blobs = [new Blob(['test content'], { type: 'image/jpeg' })];
    blobsToFiles(blobs, 'image/png', false)
      .then((files) => {
        expect(files).to.be.an('array').that.has.lengthOf(1);
      })
      .catch(() => {
        throw new Error('This should not be called');
      });
  });
});
