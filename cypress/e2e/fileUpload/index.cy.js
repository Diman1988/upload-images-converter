import 'cypress-file-upload';
import { imageConvert } from './../../../src/index';

describe('Image File Upload Tests', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/index.html');
  });

  it('should handle single uploaded image file correctly', () => {
    // Upload a single image file
    cy.get('#fileInput').attachFile('image1_vertical.jpg');

    // Call the imageConvert function
    cy.window().then((win) => {
      const fileInput = win.document.getElementById('fileInput');
      cy.wrap(imageConvert({ files: fileInput.files })).then(
        (convertedFiles) => {
          // Add assertions for the converted files
          // For example, check the type or dimensions of the image
          expect(convertedFiles[0].type).to.equal('image/webp');
          // Add other checks as needed
        },
      );
    });
  });

  it('should handle multiple uploaded image files correctly', () => {
    // Upload multiple image files
    cy.get('#fileInput').attachFile([
      'image1_vertical.jpg',
      'image2_vertical.jpg',
    ]);

    // Call the imageConvert function
    cy.window().then((win) => {
      const fileInput = win.document.getElementById('fileInput');
      cy.wrap(imageConvert({ files: fileInput.files })).then(
        (convertedFiles) => {
          // Add assertions for the converted files
          // For example, check the type or dimensions of the images
          expect(convertedFiles.length).to.equal(2);
          expect(convertedFiles[0].type).to.equal('image/webp');
          expect(convertedFiles[1].type).to.equal('image/webp');
          // Add other checks as needed
        },
      );
    });
  });

  it('should handle the situation of uploading a file with an invalid format', () => {
    // Upload a file with an invalid format (e.g., txt file instead of an image)
    cy.get('#fileInput').attachFile('invalid.txt');

    // Call the imageConvert function
    cy.window().then((win) => {
      const fileInput = win.document.getElementById('fileInput');

      const promise = imageConvert({ files: fileInput.files });

      // Обработайте ошибку промиса
      return promise.then(
        () => {
          throw new Error(
            'Expected promise to be rejected but it was resolved.',
          );
        },
        (error) => {
          expect(error.message).to.equal(
            'Invalid image types detected: text/plain. Supported types are: image/webp, image/jpg, image/jpeg, image/png',
          );
          return null; // Чтобы вернуться из ошибки и продолжить цепочку
        },
      );
    });
  });

  it('should handle if no files selected', () => {
    // Upload a single image file
    cy.get('#fileInput');

    // Call the imageConvert function
    cy.window().then((win) => {
      const fileInput = win.document.getElementById('fileInput');
      cy.wrap(imageConvert({ files: fileInput.files })).then(
        (convertedFiles) => {
          // Add assertions for the converted files
          // For example, check the type or dimensions of the image
          expect(convertedFiles.length).to.equal(0);
          // Add other checks as needed
        },
      );
    });
  });
});
