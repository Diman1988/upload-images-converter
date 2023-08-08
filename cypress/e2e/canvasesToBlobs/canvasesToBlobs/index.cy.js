import { canvasesToBlobs } from './../../../../src/canvasesToBlobs';

describe('canvasesToBlobs', () => {
  let canvas;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 50, 50);
  });

  it('должно конвертировать один canvas в blob', async () => {
    const blobs = await canvasesToBlobs([canvas], 'image/png');
    expect(blobs).to.have.lengthOf(1);
    expect(blobs[0]).to.be.instanceOf(Blob);
  });

  it('должно конвертировать несколько canvas-ов в blobs', async () => {
    const canvases = [canvas, canvas, canvas];
    const blobs = await canvasesToBlobs(canvases, 'image/png');
    expect(blobs).to.have.lengthOf(3);
    blobs.forEach((blob) => expect(blob).to.be.instanceOf(Blob));
  });

  it('должно обрабатывать пустой массив', async () => {
    const blobs = await canvasesToBlobs([], 'image/png');
    expect(blobs).to.be.empty;
  });

  it('должно выдать ошибку для недопустимого формата', () => {
    cy.window().then(() => {
      const promise = canvasesToBlobs([canvas], 'invalid/format');

      return promise.then(
        () => {
          throw new Error(
            'Ожидалось, что промис будет отклонен, но он был выполнен.',
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

  it('должно создать Blob с корректным MIME-типом', async () => {
    const blobs = await canvasesToBlobs([canvas], 'image/png');
    blobs.forEach((blob) => expect(blob.type).to.equal('image/png'));
  });

  it('должно обрабатывать null или undefined в массиве', async () => {
    const blobs = await canvasesToBlobs([canvas, null, undefined], 'image/png');
    expect(blobs).to.have.lengthOf(1); // Ожидаем, что только один canvas был успешно конвертирован
    expect(blobs[0]).to.be.instanceOf(Blob);
  });

  it('должно корректно обрабатывать массив с повторяющимися элементами canvas', async () => {
    const canvases = [canvas, canvas];
    const blobs = await canvasesToBlobs(canvases, 'image/png');
    expect(blobs).to.have.lengthOf(2);
    blobs.forEach((blob) => expect(blob).to.be.instanceOf(Blob));
  });

  it('должно конвертировать canvas в разные MIME-типы', async () => {
    const pngBlob = await canvasesToBlobs([canvas], 'image/png');
    expect(pngBlob[0].type).to.equal('image/png');

    const jpegBlob = await canvasesToBlobs([canvas], 'image/jpeg');
    expect(jpegBlob[0].type).to.equal('image/jpeg');
  });

  it('должно сохранять порядок элементов в выходном массиве', async () => {
    const anotherCanvas = document.createElement('canvas');
    const ctx = anotherCanvas.getContext('2d');
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0, 40, 40);

    const blobs = await canvasesToBlobs([canvas, anotherCanvas], 'image/png');
    expect(blobs).to.have.lengthOf(2);
  });

  it('должно корректно обрабатывать массив с большим числом элементов', async () => {
    const largeCanvasesArray = new Array(1000).fill(canvas);
    const blobs = await canvasesToBlobs(largeCanvasesArray, 'image/png');
    expect(blobs).to.have.lengthOf(1000);
    blobs.forEach((blob) => expect(blob).to.be.instanceOf(Blob));
  });

  it('должно корректно обрабатывать канвасы разных размеров', async () => {
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
