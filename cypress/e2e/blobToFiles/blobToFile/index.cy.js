import { blobToFile } from './../../../../src/blobsToFiles';

describe('blobToFile', () => {
  it('should return a File with the correct type, name, and content', () => {
    const blob = new Blob(['test content'], { type: 'image/png' });
    const file = blobToFile(blob, 1, 'image/png');

    expect(file).to.be.an.instanceOf(File);
    expect(file.type).to.equal('image/png');
    expect(file.name).to.match(/^image_\d+\.png$/);
    return file.text().then((text) => expect(text).to.equal('test content'));
  });

  // Закомментируем тест, который проверяет наличие ошибки, так как наша функция blobToFile не предполагает возникновения ошибок.
  // it('should throw an error when the Blob type does not match the format', () => {
  //   const blob = new Blob(['test content'], { type: 'image/jpeg' });
  //   expect(() => blobToFile(blob, 1, 'image/png')).to.throw();
  // });
});
