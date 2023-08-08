import { canvasToBlob } from './../../../../src/canvasesToBlobs';

describe('canvasToBlob', () => {
  let canvas;

  // Создание canvas элемента перед каждым тестом
  beforeEach(() => {
    cy.document().then((doc) => {
      canvas = doc.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(10, 10, 50, 50);
    });
  });

  afterEach(() => {
    // Восстановление canvas к его исходному состоянию или пересоздание
    cy.document().then((doc) => {
      canvas = doc.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(10, 10, 50, 50);
    });
  });

  it('should convert a canvas to a Blob with a valid MIME type', () => {
    // Convert canvas to Blob
    cy.wrap(canvasToBlob(canvas, 'image/jpeg')).should('be.a', 'blob');
  });

  it('should throw an error with an unsupported MIME type', () => {
    cy.window().then(() => {
      const promise = canvasToBlob(canvas, 'unsupported/format');

      // Handle the promise error
      return promise.then(
        () => {
          throw new Error(
            'Expected promise to be rejected but it was resolved.',
          );
        },
        (error) => {
          expect(error.message).to.equal(
            'Unsupported format: unsupported/format',
          );
          return null; // To move on from the error and continue the chain
        },
      );
    });
  });

  it('should throw an error if canvas.toBlob is not supported', () => {
    cy.window().then(() => {
      // Mocking the absence of toBlob method
      canvas.toBlob = undefined;

      const promise = canvasToBlob(canvas, 'image/jpeg');

      // Handle the promise error
      return promise.then(
        () => {
          throw new Error(
            'Expected promise to be rejected but it was resolved.',
          );
        },
        (error) => {
          expect(error.message).to.equal(
            'Method canvas.toBlob is not supported by this browser.',
          );
          return null; // To move on from the error and continue the chain
        },
      );
    });
  });

  it('should produce a Blob with the correct MIME type', () => {
    cy.wrap(canvasToBlob(canvas, 'image/jpeg')).then((blob) => {
      expect(blob.type).to.equal('image/jpeg');
    });
  });

  it('should throw an error if no canvas is provided', () => {
    cy.window().then(() => {
      const promise = canvasToBlob(undefined, 'image/jpeg');

      return promise.then(
        () => {
          throw new Error(
            'Expected promise to be rejected but it was resolved.',
          );
        },
        (error) => {
          expect(error.message).to.equal(
            'Canvas must not be null or undefined.',
          );
          return null; // To move on from the error and continue the chain
        },
      );
    });
  });

  it('should throw an error if toBlob does not produce a Blob', () => {
    cy.window().then(() => {
      // Mocking the toBlob method to not return a Blob
      canvas.toBlob = (callback) => {
        callback(null);
      };

      const promise = canvasToBlob(canvas, 'image/jpeg');

      return promise.then(
        () => {
          throw new Error(
            'Expected promise to be rejected but it was resolved.',
          );
        },
        (error) => {
          expect(error.message).to.equal(
            'Failed to convert canvas to blob with format: image/jpeg',
          );
          return null; // To move on from the error and continue the chain
        },
      );
    });
  });
});
