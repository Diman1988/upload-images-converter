import { calculateCropDimensions } from '@app/calculateCropDimensions';

describe('calculateCropDimensions', () => {
  it('should calculate crop dimensions correctly for equal aspect ratios', () => {
    const imageWidth = 600;
    const imageHeight = 600;
    const targetWidth = 500;
    const targetHeight = 500;
    const targetRatio = targetWidth / targetHeight;
    const imageRatio = imageWidth / imageHeight;

    const cropDimensions = calculateCropDimensions(
      imageWidth,
      imageHeight,
      targetWidth,
      targetHeight,
      targetRatio,
      imageRatio,
    );

    // Assert the crop dimensions here
    // For example:
    expect(cropDimensions.cropX).to.equal(0);
    expect(cropDimensions.cropY).to.equal(0);
    expect(cropDimensions.cropWidth).to.equal(600);
    expect(cropDimensions.cropHeight).to.equal(600);
  });

  it('should calculate crop dimensions correctly for non-equal aspect ratios', () => {
    // Similar to the above test but with different aspect ratios
    // Define your test inputs and expected crop dimensions
    // Then use expect() to make assertions
  });
});
