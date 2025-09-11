import { blobsToFiles } from './';

describe('blobsToFiles', () => {
  it('should return an array of Files with the correct type and content', () => {
    const blobs = [
      new Blob(['test content 1'], { type: 'image/png' }),
      new Blob(['test content 2'], { type: 'image/png' }),
    ];
    const files = blobsToFiles(blobs, 'image/png', true);
    expect(files).to.be.an('array').that.has.lengthOf(2);

    files.forEach((file, index) => {
      expect(file).to.be.an.instanceof(File);
      expect(file.type).to.eq('image/png');
      expect(file.name).to.match(/^image_\d+\.png$/);
      file
        .text()
        .then((text) => expect(text).to.eq(`test content ${index + 1}`));
    });
  });

  it('should handle an empty array of blobs correctly', () => {
    const blobs = [];
    const files = blobsToFiles(blobs, 'image/png', true);
    expect(files).to.be.an('array').that.is.empty;
  });

  it('should throw an error when showErrors is true and the Blob type does not match the format', () => {
    const blobs = [new Blob(['test content'], { type: 'image/jpeg' })];
    expect(() => {
      blobsToFiles(blobs, 'image/png', true);
    }).to.throw();
  });

  it('should not throw an error when showErrors is false and the Blob type does not match the format', () => {
    const blobs = [new Blob(['test content'], { type: 'image/jpeg' })];
    const files = blobsToFiles(blobs, 'image/png', false);
    expect(files).to.be.an('array').that.has.lengthOf(1);
  });
});
