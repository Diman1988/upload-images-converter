import 'cypress-file-upload';
import { imageConvert } from './../../../src/index';

describe('Image Convertation Test', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/index.html');
    cy.fixture('image1_vertical.jpg', 'base64').as('image1');
    cy.fixture('image2_vertical.jpg', 'base64').as('image2');
  });

  afterEach(() => {
    cy.window().then((win) => {
      const img1 = win.document.getElementById('demo-image1');
      img1.src = '';
      img1.style.display = 'none';
    });

    cy.window().then((win) => {
      const img2 = win.document.getElementById('demo-image2');
      img2.src = '';
      img2.style.display = 'none';
    });
  });

  it('should handle and convert single uploaded image file to image/jpg', () => {
    cy.get('@image1').then((image1) => {
      cy.get('#fileInput').attachFile({
        fileContent: image1,
        fileName: 'image1_vertical.jpg',
        mimeType: 'image/jpg',
        encoding: 'base64',
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById('fileInput');

        cy.wrap(
          imageConvert({ files: fileInput.files, format: 'image/jpg' }),
        ).then((convertedFiles) => {
          expect(convertedFiles.length).to.equal(1);
          expect(convertedFiles[0].type).to.equal('image/jpg');

          // Set the converted image as the source for #demo-image
          const objectUrl = URL.createObjectURL(convertedFiles[0]);

          const img1 = win.document.getElementById('demo-image1');
          img1.src = objectUrl;
          img1.style.display = 'block';

          cy.get('#demo-image1')
            .should('be.visible')
            .and(($img) => {
              // your assertions here...
              expect($img[0].complete).to.be.true;

              expect($img[0].naturalWidth).to.be.greaterThan(0);
              expect($img[0].naturalHeight).to.be.greaterThan(0);
              expect($img[0].naturalWidth).to.equal(500); // Expected width after conversion
              expect($img[0].naturalHeight).to.equal(500); // Expected height after conversion
              expect($img[0].naturalWidth).to.equal($img[0].width); // Ensure the image is displayed at its natural size
              expect($img[0].naturalHeight).to.equal($img[0].height); // Ensure the image is displayed at its natural size
            });
        });
      });
    });
  });

  it('should handle and convert single uploaded image file to image/jpeg', () => {
    cy.get('@image1').then((image1) => {
      cy.get('#fileInput').attachFile({
        fileContent: image1,
        fileName: 'image1_vertical.jpeg',
        mimeType: 'image/jpg',
        encoding: 'base64',
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById('fileInput');

        cy.wrap(
          imageConvert({ files: fileInput.files, format: 'image/jpeg' }),
        ).then((convertedFiles) => {
          expect(convertedFiles.length).to.equal(1);
          expect(convertedFiles[0].type).to.equal('image/jpeg');

          // Set the converted image as the source for #demo-image
          const objectUrl = URL.createObjectURL(convertedFiles[0]);

          const img1 = win.document.getElementById('demo-image1');
          img1.src = objectUrl;
          img1.style.display = 'block';

          cy.get('#demo-image1')
            .should('be.visible')
            .and(($img) => {
              // your assertions here...
              expect($img[0].complete).to.be.true;

              expect($img[0].naturalWidth).to.be.greaterThan(0);
              expect($img[0].naturalHeight).to.be.greaterThan(0);
              expect($img[0].naturalWidth).to.equal(500); // Expected width after conversion
              expect($img[0].naturalHeight).to.equal(500); // Expected height after conversion
              expect($img[0].naturalWidth).to.equal($img[0].width); // Ensure the image is displayed at its natural size
              expect($img[0].naturalHeight).to.equal($img[0].height); // Ensure the image is displayed at its natural size
            });
        });
      });
    });
  });

  it('should handle and convert single uploaded image file to image/png', () => {
    cy.get('@image1').then((image1) => {
      cy.get('#fileInput').attachFile({
        fileContent: image1,
        fileName: 'image1_vertical.jpeg',
        mimeType: 'image/jpg',
        encoding: 'base64',
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById('fileInput');

        cy.wrap(
          imageConvert({ files: fileInput.files, format: 'image/png' }),
        ).then((convertedFiles) => {
          expect(convertedFiles.length).to.equal(1);
          expect(convertedFiles[0].type).to.equal('image/png');

          // Set the converted image as the source for #demo-image
          const objectUrl = URL.createObjectURL(convertedFiles[0]);

          const img1 = win.document.getElementById('demo-image1');
          img1.src = objectUrl;
          img1.style.display = 'block';

          cy.get('#demo-image1')
            .should('be.visible')
            .and(($img) => {
              // your assertions here...
              expect($img[0].complete).to.be.true;

              expect($img[0].naturalWidth).to.be.greaterThan(0);
              expect($img[0].naturalHeight).to.be.greaterThan(0);
              expect($img[0].naturalWidth).to.equal(500); // Expected width after conversion
              expect($img[0].naturalHeight).to.equal(500); // Expected height after conversion
              expect($img[0].naturalWidth).to.equal($img[0].width); // Ensure the image is displayed at its natural size
              expect($img[0].naturalHeight).to.equal($img[0].height); // Ensure the image is displayed at its natural size
            });
        });
      });
    });
  });

  it('should handle and convert single uploaded image file to image/webp', () => {
    cy.get('@image1').then((image1) => {
      cy.get('#fileInput').attachFile({
        fileContent: image1,
        fileName: 'image1_vertical.jpeg',
        mimeType: 'image/jpg',
        encoding: 'base64',
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById('fileInput');

        cy.wrap(
          imageConvert({ files: fileInput.files, format: 'image/webp' }),
        ).then((convertedFiles) => {
          expect(convertedFiles.length).to.equal(1);
          expect(convertedFiles[0].type).to.equal('image/webp');

          // Set the converted image as the source for #demo-image
          const objectUrl = URL.createObjectURL(convertedFiles[0]);

          const img1 = win.document.getElementById('demo-image1');
          img1.src = objectUrl;
          img1.style.display = 'block';

          cy.get('#demo-image1')
            .should('be.visible')
            .and(($img) => {
              // your assertions here...
              expect($img[0].complete).to.be.true;

              expect($img[0].naturalWidth).to.be.greaterThan(0);
              expect($img[0].naturalHeight).to.be.greaterThan(0);
              expect($img[0].naturalWidth).to.equal(500); // Expected width after conversion
              expect($img[0].naturalHeight).to.equal(500); // Expected height after conversion
              expect($img[0].naturalWidth).to.equal($img[0].width); // Ensure the image is displayed at its natural size
              expect($img[0].naturalHeight).to.equal($img[0].height); // Ensure the image is displayed at its natural size
            });
        });
      });
    });
  });
});
