import { canvasToBlob } from './';

describe('canvasToBlob', () => {
  let canvas;

  beforeEach(() => {
    cy.document().then((doc) => {
      canvas = doc.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(10, 10, 50, 50);
    });
  });

  afterEach(() => {
    cy.document().then((doc) => {
      canvas = doc.createElement('canvas');
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'blue';
      ctx.fillRect(10, 10, 50, 50);
    });
  });

  const testCases = [
    {
      description: 'should convert a canvas to a Blob with a valid MIME type',
      mimeType: 'image/jpeg',
      shouldReject: false,
      expectedErrorMessage: null,
    },
    {
      description: 'should throw an error with an unsupported MIME type',
      mimeType: 'unsupported/format',
      shouldReject: true,
      expectedErrorMessage: 'Unsupported format: unsupported/format',
    },
    {
      description: 'should throw an error if canvas.toBlob is not supported',
      mimeType: 'image/jpeg',
      mockToBlob: false,
      shouldReject: true,
      expectedErrorMessage:
        'Method canvas.toBlob is not supported by this browser.',
    },
    {
      description: 'should produce a Blob with the correct MIME type',
      mimeType: 'image/jpeg',
      shouldReject: false,
      expectedErrorMessage: null,
    },
    // {
    //   description: 'should throw an error if no canvas is provided',
    //   canvas: undefined,
    //   mimeType: 'image/jpeg',
    //   shouldReject: true,
    //   expectedErrorMessage: 'Canvas must not be null or undefined.',
    // },
    {
      description: 'should throw an error if toBlob does not produce a Blob',
      mimeType: 'image/jpeg',
      mockToBlobNull: true,
      shouldReject: true,
      expectedErrorMessage:
        'Failed to convert canvas to blob with format: image/jpeg',
    },
  ];

  testCases.forEach(
    ({
      description,
      mimeType,
      shouldReject,
      expectedErrorMessage,
      mockToBlob,
      mockToBlobNull,
    }) => {
      it(description, () => {
        if (mockToBlob === false) {
          canvas.toBlob = undefined;
        }

        if (mockToBlobNull === true) {
          canvas.toBlob = (callback) => {
            callback(null);
          };
        }

        const promise = canvasToBlob(canvas, mimeType);

        if (shouldReject) {
          return promise.then(
            () => {
              throw new Error(
                'Expected promise to be rejected but it was resolved.',
              );
            },
            (error) => {
              expect(error.message).to.equal(expectedErrorMessage);
            },
          );
        } else {
          cy.wrap(promise)
            .should('be.a', 'blob')
            .then((blob) => {
              if (blob) {
                expect(blob.type).to.equal(mimeType);
              }
            });
        }
      });
    },
  );
});
