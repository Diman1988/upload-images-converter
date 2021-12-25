function resizeFile(correctWidth: number, correctHeight: number, file: File): Promise<HTMLCanvasElement> {
  return new Promise((resolve, reject) => {
    const tempImg = new Image(); // Img should be created to read file
    tempImg.src = URL.createObjectURL(file); // Convert file to URL
    tempImg.onload = (): void => { // When file loaded
      const imageWidth = tempImg.width; // Actual image width
      const imageHeight = tempImg.height; // Actual image height
      const width = correctWidth / imageWidth; // Scale width coefficient
      const height = correctHeight / imageHeight; // Scale height coefficient
      const tempCanvas = document.createElement('canvas'); // Create a canvas
      tempCanvas.width = correctWidth; // Initialaize canvas width
      tempCanvas.height = correctHeight; // Initialaize canvas height
      // Init drow parameters
      let cropX = 0;
      let cropY = 0;
      let cropedWidth = 0;
      let cropedHeight = 0;
      // Getting 2D context from canvas
      const can = tempCanvas.getContext('2d') as CanvasRenderingContext2D;
      // Check image ratio
      if (imageWidth > imageHeight) {
        const originalCoef = imageWidth / imageHeight; // Original ratio coefficient
        // Check image ratio from new sizes
        if (correctWidth > correctHeight) {
          const cropCoef = correctWidth / correctHeight; // New ratio coefficient
          if (originalCoef < cropCoef) {
            cropedWidth = Math.floor(imageWidth);
            cropedHeight = Math.floor(cropedWidth / cropCoef);
            cropX = Math.floor((imageWidth - cropedWidth) / 2); // Always 0
            cropY = Math.floor((imageHeight - cropedHeight) / 2);
          } else if (originalCoef > cropCoef) {
            cropedWidth = Math.floor(imageHeight * cropCoef);
            cropedHeight = Math.floor(imageHeight);
            cropX = Math.floor((imageWidth - cropedWidth) / 2);
            cropY = Math.floor((imageHeight - cropedHeight) / 2); // Always 0
          }
        } else if (correctWidth < correctHeight) {
          const cropCoef = correctHeight / correctWidth;
          if (originalCoef < cropCoef) {
            cropedWidth = Math.floor(imageHeight / cropCoef);
            cropedHeight = Math.floor(imageHeight);
            cropX = Math.floor((imageWidth - cropedWidth) / 2);
            cropY = Math.floor((imageHeight - cropedHeight) / 2); // Always 0
          } else if (originalCoef > cropCoef) {
            cropedWidth = Math.floor(imageHeight / cropCoef);
            cropedHeight = Math.floor(imageHeight);
            cropX = Math.floor((imageWidth - cropedWidth) / 2);
            cropY = Math.floor((imageHeight - cropedHeight) / 2); // Always 0
          }
        } else {
          cropedWidth = imageHeight;
          cropedHeight = imageHeight;
          cropX = Math.floor((imageWidth - cropedWidth) / 2);
          cropY = Math.floor((imageHeight - cropedHeight) / 2);
        }
  
        can.drawImage(tempImg, cropX, cropY, cropedWidth, cropedHeight, 0, 0, correctWidth, correctHeight);
      } else if (imageWidth < imageHeight) {
        const originalCoef = imageHeight / imageWidth; // Original ratio coefficient
        if (correctWidth > correctHeight) {
          const cropCoef = correctWidth / correctHeight; // New ratio coefficient
          if (originalCoef < cropCoef) {
            cropedWidth = Math.floor(imageWidth);
            cropedHeight = Math.floor(imageWidth / cropCoef);
            cropX = Math.floor((imageWidth - cropedWidth) / 2);
            cropY = Math.floor((imageHeight - cropedHeight) / 2);
          } else if (originalCoef > cropCoef) {
            cropedWidth = Math.floor(imageWidth);
            cropedHeight = Math.floor(imageWidth / cropCoef);
            cropX = Math.floor((imageWidth - cropedWidth) / 2);
            cropY = Math.floor((imageHeight - cropedHeight) / 2);
          }
        } else if (correctWidth < correctHeight) {
          const cropCoef = correctHeight / correctWidth; // New ratio coefficient
          if (originalCoef < cropCoef) {
            cropedWidth = Math.floor(imageHeight / cropCoef);
            cropedHeight = Math.floor(imageHeight);
            cropX = Math.floor((imageWidth - cropedWidth) / 2);
            cropY = Math.floor((imageHeight - cropedHeight) / 2);
          } else if (originalCoef > cropCoef) {
            cropedWidth = Math.floor(imageWidth);
            cropedHeight = Math.floor(imageWidth * cropCoef);
            cropX = Math.floor((imageWidth - cropedWidth) / 2);
            cropY = Math.floor((imageHeight - cropedHeight) / 2);
          }
        } else {
          cropedWidth = imageWidth;
          cropedHeight = imageWidth;
          cropX = Math.floor((imageWidth - cropedWidth) / 2);
          cropY = Math.floor((imageHeight - cropedHeight) / 2);
        }
  
        can.drawImage(tempImg, cropX, cropY, cropedWidth, cropedHeight, 0, 0, correctWidth, correctHeight);
      } else if (imageWidth === imageHeight) {
        can.drawImage(tempImg, 0, 0, correctWidth, correctHeight);
      }
      can.scale(width, height); // Scale canvas image by context
      URL.revokeObjectURL(tempImg.src);
      resolve(tempCanvas);
    };
    tempImg.onerror = (): void => reject(new Error('Image load error'));
  });
}

export { resizeFile };
