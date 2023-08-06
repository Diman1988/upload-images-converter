import "cypress-file-upload";
import { imageConvert } from "./../../../src/index";

describe("Image Formatting Test", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/index.html");
    cy.fixture("image1_vertical.jpg", "base64").as("image1");
    cy.fixture("image2_vertical.jpg", "base64").as("image2");
  });

  afterEach(() => {
    cy.window().then((win) => {
      const img1 = win.document.getElementById("demo-image1");
      img1.src = "";
      img1.style.display = "none";
    });

    cy.window().then((win) => {
      const img2 = win.document.getElementById("demo-image2");
      img2.src = "";
      img2.style.display = "none";
    });
  });

  it("should handle single uploaded image file correctly", () => {
    cy.get("@image1").then((image1) => {
      cy.get("#fileInput").attachFile({
        fileContent: image1,
        fileName: "image1_vertical.jpg",
        mimeType: "image/jpg",
        encoding: "base64",
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById("fileInput");

        cy.wrap(imageConvert({ files: fileInput.files })).then(
          (convertedFiles) => {
            expect(convertedFiles.length).to.equal(1);
            expect(convertedFiles[0].type).to.equal("image/webp");

            // Set the converted image as the source for #demo-image
            const objectUrl = URL.createObjectURL(convertedFiles[0]);

            const img1 = win.document.getElementById("demo-image1");
            img1.src = objectUrl;
            img1.style.display = "block";

            cy.get("#demo-image1")
              .should("be.visible")
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
          }
        );
      });
    });
  });

  it("should handle single uploaded image file correctly with resolution 1000 * 700", () => {
    cy.get("@image1").then((image1) => {
      cy.get("#fileInput").attachFile({
        fileContent: image1,
        fileName: "image1_vertical.jpg",
        mimeType: "image/jpg",
        encoding: "base64",
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById("fileInput");

        cy.wrap(
          imageConvert({ files: fileInput.files, width: 1000, height: 700 })
        ).then((convertedFiles) => {
          expect(convertedFiles.length).to.equal(1);
          expect(convertedFiles[0].type).to.equal("image/webp");

          // Set the converted image as the source for #demo-image
          const objectUrl = URL.createObjectURL(convertedFiles[0]);

          const img1 = win.document.getElementById("demo-image1");
          img1.src = objectUrl;
          img1.style.display = "block";

          cy.get("#demo-image1")
            .should("be.visible")
            .and(($img) => {
              // your assertions here...
              expect($img[0].complete).to.be.true;

              expect($img[0].naturalWidth).to.be.greaterThan(0);
              expect($img[0].naturalHeight).to.be.greaterThan(0);
              expect($img[0].naturalWidth).to.equal(1000); // Expected width after conversion
              expect($img[0].naturalHeight).to.equal(700); // Expected height after conversion
              expect($img[0].naturalWidth).to.equal($img[0].width); // Ensure the image is displayed at its natural size
              expect($img[0].naturalHeight).to.equal($img[0].height); // Ensure the image is displayed at its natural size
            });
        });
      });
    });
  });

  it("should handle single uploaded image file correctly with resolution 300 * 500", () => {
    cy.get("@image2").then((image1) => {
      cy.get("#fileInput").attachFile({
        fileContent: image1,
        fileName: "image2_vertical.jpg",
        mimeType: "image/jpg",
        encoding: "base64",
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById("fileInput");

        cy.wrap(
          imageConvert({ files: fileInput.files, width: 300, height: 500 })
        ).then((convertedFiles) => {
          expect(convertedFiles.length).to.equal(1);
          expect(convertedFiles[0].type).to.equal("image/webp");

          // Set the converted image as the source for #demo-image
          const objectUrl = URL.createObjectURL(convertedFiles[0]);

          const img1 = win.document.getElementById("demo-image1");
          img1.src = objectUrl;
          img1.style.display = "block";

          cy.get("#demo-image1")
            .should("be.visible")
            .and(($img) => {
              // your assertions here...
              expect($img[0].complete).to.be.true;

              expect($img[0].naturalWidth).to.be.greaterThan(0);
              expect($img[0].naturalHeight).to.be.greaterThan(0);
              expect($img[0].naturalWidth).to.equal(300); // Expected width after conversion
              expect($img[0].naturalHeight).to.equal(500); // Expected height after conversion
              expect($img[0].naturalWidth).to.equal($img[0].width); // Ensure the image is displayed at its natural size
              expect($img[0].naturalHeight).to.equal($img[0].height); // Ensure the image is displayed at its natural size
            });
        });
      });
    });
  });

  it("should handle multiple uploaded image files correctly", () => {
    cy.get("@image1").then((image1) => {
      cy.get("@image2").then((image2) => {
        cy.get("#fileInput").attachFile([
          {
            fileContent: image1,
            fileName: "image1_vertical.jpg",
            mimeType: "image/jpg",
            encoding: "base64",
          },
          {
            fileContent: image2,
            fileName: "image2_vertical.jpg",
            mimeType: "image/jpg",
            encoding: "base64",
          },
        ]);

        cy.window().then((win) => {
          // Access the fileInput in the window context
          const fileInput = win.document.getElementById("fileInput");

          cy.wrap(imageConvert({ files: fileInput.files })).then(
            (convertedFiles) => {
              expect(convertedFiles.length).to.equal(2);
              convertedFiles.forEach((file, i) => {
                expect(file.type).to.equal("image/webp");

                // Set the converted image as the source for #demo-image
                const objectUrl = URL.createObjectURL(file);

                const img = win.document.getElementById(`demo-image${i + 1}`);
                img.src = objectUrl;
                img.style.display = "block";

                cy.get(`#demo-image${i + 1}`)
                  .should("be.visible")
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
            }
          );
        });
      });
    });
  });

  it("should handle single uploaded image file correctly with wrong resolution -700 * 1000", () => {
    cy.get("@image2").then((image1) => {
      cy.get("#fileInput").attachFile({
        fileContent: image1,
        fileName: "image2_vertical.jpg",
        mimeType: "image/jpg",
        encoding: "base64",
      });

      cy.window().then((win) => {
        // Access the fileInput in the window context
        const fileInput = win.document.getElementById("fileInput");

        // Call the imageConvert function and expect it to throw an error
        imageConvert({ files: fileInput.files, width: -700, height: 1000 })
          .then(() => {
            // The promise should not resolve, so fail the test if it does
            expect.fail("Expected promise to be rejected but it was resolved.");
          })
          .catch((error) => {
            // Check if the error message matches the expected message
            expect(error.message).to.equal(
              "Invalid input: correctWidth and correctHeight must be positive numbers"
            );
          });
      });
    });
  });
});
