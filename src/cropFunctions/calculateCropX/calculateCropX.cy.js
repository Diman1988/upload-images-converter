import { calculateCropX } from './';

describe('calculateCropX', () => {
  it('should calculate the X-coordinate correctly when the image aspect ratio is less than the target aspect ratio', () => {
    const imageWidth = 120;
    const cropWidth = 80;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should calculate the X-coordinate correctly when the image aspect ratio is greater than the target aspect ratio', () => {
    const imageWidth = 180;
    const cropWidth = 120;
    const isImageRatioLessThanTarget = false;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(30);
  });

  it('should calculate the X-coordinate correctly when the image aspect ratio is equal to the target aspect ratio', () => {
    const imageWidth = 200;
    const cropWidth = 200;
    const isImageRatioLessThanTarget = false;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should return 0 for a zero crop width', () => {
    const imageWidth = 150;
    const cropWidth = 0;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should return 0 for a zero image width', () => {
    const imageWidth = 0;
    const cropWidth = 100;
    const isImageRatioLessThanTarget = false;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should return 0 if both the image width and the crop width are zero', () => {
    const imageWidth = 0;
    const cropWidth = 0;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should handle very large image and crop widths', () => {
    const imageWidth = 1e10;
    const cropWidth = 1e10;
    const isImageRatioLessThanTarget = false;

    const result = calculateCropX(
      imageWidth,
      cropWidth,
      isImageRatioLessThanTarget,
    );
    expect(result).to.equal(0);
  });

  it('should throw an error for a negative image width', () => {
    const imageWidth = -150;
    const cropWidth = 100;
    const isImageRatioLessThanTarget = false;
    expect(() => {
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget);
    }).to.throw();
  });

  it('should throw an error for a negative crop width', () => {
    const imageWidth = 150;
    const cropWidth = -100;
    const isImageRatioLessThanTarget = false;
    expect(() => {
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget);
    }).to.throw();
  });

  it('should handle decimal values for imageWidth and cropWidth correctly', () => {
    const imageWidth = 200.5;
    const cropWidth = 120.5;
    const isImageRatioLessThanTarget = false;
    const expectedValue = (imageWidth - cropWidth) / 2;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(expectedValue);
  });

  it('should handle the scenario where cropWidth is greater than imageWidth and image ratio is less than target', () => {
    const imageWidth = 80;
    const cropWidth = 120;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should handle the scenario where cropWidth is greater than imageWidth and image ratio is not less than target', () => {
    const imageWidth = 80;
    const cropWidth = 120;
    const isImageRatioLessThanTarget = false;
    expect(
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget),
    ).to.equal(-20);
  });

  it('should throw an error when passed a string for imageWidth', () => {
    const imageWidth = '100';
    const cropWidth = 80;
    const isImageRatioLessThanTarget = true;
    expect(() => {
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget);
    }).to.throw();
  });

  it('should throw an error when passed an object for cropWidth', () => {
    const imageWidth = 150;
    const cropWidth = { value: 100 };
    const isImageRatioLessThanTarget = false;
    expect(() => {
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget);
    }).to.throw();
  });

  it('should throw an error when passed a negative number for imageWidth', () => {
    const imageWidth = -100;
    const cropWidth = 80;
    const isImageRatioLessThanTarget = true;
    expect(() => {
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget);
    }).to.throw();
  });

  it('should throw an error when passed a negative number for cropWidth', () => {
    const imageWidth = 150;
    const cropWidth = -100;
    const isImageRatioLessThanTarget = false;
    expect(() => {
      calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget);
    }).to.throw();
  });

  it('should execute within acceptable time for large numbers', () => {
    const imageWidth = 1e7;
    const cropWidth = 1e6;
    const isImageRatioLessThanTarget = false;

    const startTime = performance.now();

    calculateCropX(imageWidth, cropWidth, isImageRatioLessThanTarget);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).to.be.below(50); // ожидается, что время выполнения будет менее 50 миллисекунд
  });
});
