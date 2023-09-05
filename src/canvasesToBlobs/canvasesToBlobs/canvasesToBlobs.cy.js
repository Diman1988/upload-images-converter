import { canvasesToBlobs } from './';

describe('canvasesToBlobs', () => {
  let canvas;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 50, 50);
  });

  it('should convert a single canvas to a blob', async () => {
    const blobs = await canvasesToBlobs([canvas], 'image/png');
    expect(blobs).to.have.lengthOf(1);
    expect(blobs[0]).to.be.instanceOf(Blob);
  });

  it('should convert multiple canvases to blobs', async () => {
    const canvases = [canvas, canvas, canvas];
    const blobs = await canvasesToBlobs(canvases, 'image/png');
    expect(blobs).to.have.lengthOf(3);
    blobs.forEach((blob) => expect(blob).to.be.instanceOf(Blob));
  });

  it('should handle an empty array', async () => {
    const blobs = await canvasesToBlobs([], 'image/png');
    expect(blobs).to.be.empty;
  });

  it('should throw an error for an invalid format', () => {
    cy.window().then(() => {
      const promise = canvasesToBlobs([canvas], 'invalid/format');

      return promise.then(
        () => {
          throw new Error(
            'Expected the promise to be rejected, but it was resolved.',
          );
        },
        (error) => {
          expect(error).to.be.instanceOf(Error);
          expect(error.message).to.equal('Unsupported format: invalid/format');
          return null;
        },
      );
    });
  });

  it('should create a Blob with the correct MIME type', async () => {
    const blobs = await canvasesToBlobs([canvas], 'image/png');
    blobs.forEach((blob) => expect(blob.type).to.equal('image/png'));
  });

  it('should handle null or undefined in the array', async () => {
    const blobs = await canvasesToBlobs([canvas, null, undefined], 'image/png');
    expect(blobs).to.have.lengthOf(1); // Expecting only one canvas to be successfully converted
    expect(blobs[0]).to.be.instanceOf(Blob);
  });

  it('should handle an array with duplicate canvas elements', async () => {
    const canvases = [canvas, canvas];
    const blobs = await canvasesToBlobs(canvases, 'image/png');
    expect(blobs).to.have.lengthOf(2);
    blobs.forEach((blob) => expect(blob).to.be.instanceOf(Blob));
  });

  it('should convert canvas to different MIME types', async () => {
    const pngBlob = await canvasesToBlobs([canvas], 'image/png');
    expect(pngBlob[0].type).to.equal('image/png');

    const jpegBlob = await canvasesToBlobs([canvas], 'image/jpeg');
    expect(jpegBlob[0].type).to.equal('image/jpeg');
  });

  it('should maintain the order of elements in the output array', async () => {
    const anotherCanvas = document.createElement('canvas');
    const ctx = anotherCanvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 40, 40);

    const blobs = await canvasesToBlobs([canvas, anotherCanvas], 'image/png');
    expect(blobs).to.have.lengthOf(2);
  });

  it('should handle an array with a large number of elements', async () => {
    const largeCanvasesArray = new Array(1000).fill(canvas);
    const blobs = await canvasesToBlobs(largeCanvasesArray, 'image/png');
    expect(blobs).to.have.lengthOf(1000);
    blobs.forEach((blob) => expect(blob).to.be.instanceOf(Blob));
  });

  it('should handle canvases of different sizes', async () => {
    const smallCanvas = document.createElement('canvas');
    const ctxSmall = smallCanvas.getContext('2d');
    ctxSmall.fillRect(0, 0, 10, 10);

    const largeCanvas = document.createElement('canvas');
    largeCanvas.width = 500;
    largeCanvas.height = 500;
    const ctxLarge = largeCanvas.getContext('2d');
    ctxLarge.fillRect(0, 0, 500, 500);

    const blobs = await canvasesToBlobs(
      [smallCanvas, largeCanvas],
      'image/png',
    );
    expect(blobs).to.have.lengthOf(2);
    expect(blobs[0]).to.be.instanceOf(Blob);
    expect(blobs[1]).to.be.instanceOf(Blob);
  });
});
