import { calculateCropY } from './../../../../src/cropFunctions';

describe('calculateCropY', () => {
  it('should calculate the Y-coordinate correctly when the image aspect ratio is less than the target aspect ratio', () => {
    const imageHeight = 120;
    const cropHeight = 80;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(20); // (120 - 80) / 2 = 20
  });

  it('should calculate the Y-coordinate correctly when the image aspect ratio is greater than the target aspect ratio', () => {
    const imageHeight = 180;
    const cropHeight = 120;
    const isImageRatioLessThanTarget = false;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should calculate the Y-coordinate correctly when the image aspect ratio is equal to the target aspect ratio', () => {
    const imageHeight = 200;
    const cropHeight = 200;
    const isImageRatioLessThanTarget = false;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should return 0 for a zero crop height', () => {
    const imageHeight = 150;
    const cropHeight = 0;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should return 0 for a zero image height', () => {
    const imageHeight = 0;
    const cropHeight = 100;
    const isImageRatioLessThanTarget = false;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should return 0 if both the image height and the crop height are zero', () => {
    const imageHeight = 0;
    const cropHeight = 0;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should handle very large image and crop heights', () => {
    const imageHeight = 1e10;
    const cropHeight = 1e10;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  // Test for performance
  it('should execute within acceptable time for large numbers', () => {
    const imageHeight = 1e7;
    const cropHeight = 1e6;
    const isImageRatioLessThanTarget = true;

    const startTime = performance.now();

    calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    expect(elapsedTime).to.be.below(50); // ожидается, что время выполнения будет менее 50 миллисекунд
  });
});

describe('Additional Tests for calculateCropY', () => {
  it('should return correct value for very small non-zero imageHeight and cropHeight', () => {
    const imageHeight = Number.EPSILON;
    const cropHeight = Number.EPSILON;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(0);
  });

  it('should throw an error if imageHeight is negative', () => {
    expect(() => calculateCropY(-100, 50, true)).to.throw();
  });

  it('should throw an error if cropHeight is negative', () => {
    expect(() => calculateCropY(100, -50, true)).to.throw();
  });

  it('should throw an error if isImageRatioLessThanTarget is not a boolean', () => {
    expect(() => calculateCropY(100, 50, 'true')).to.throw();
    expect(() => calculateCropY(100, 50, null)).to.throw();
    expect(() => calculateCropY(100, 50, 123)).to.throw();
  });

  it('should return 0 if cropHeight is significantly larger than imageHeight', () => {
    const imageHeight = 10;
    const cropHeight = 1e5;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(-49995); // (10 - 100000) / 2
  });

  it('should return 0 if imageHeight is significantly larger than cropHeight', () => {
    const imageHeight = 1e5;
    const cropHeight = 10;
    const isImageRatioLessThanTarget = true;
    expect(
      calculateCropY(imageHeight, cropHeight, isImageRatioLessThanTarget),
    ).to.equal(49995); // (100000 - 10) / 2
  });

  it('should return 0 when imageHeight and cropHeight are equal', () => {
    expect(calculateCropY(100, 100, true)).to.equal(0);
    expect(calculateCropY(100, 100, false)).to.equal(0);
  });

  it('should return 0 when cropHeight is 0', () => {
    expect(calculateCropY(100, 0, true)).to.equal(0);
    expect(calculateCropY(100, 0, false)).to.equal(0);
  });

  it('should throw error when imageHeight is NaN', () => {
    expect(() => calculateCropY(NaN, 100, true)).to.throw();
  });

  it('should throw error when cropHeight is NaN', () => {
    expect(() => calculateCropY(100, NaN, true)).to.throw();
  });

  it('should throw error when imageHeight is Infinity', () => {
    expect(() => calculateCropY(Infinity, 100, true)).to.throw();
  });

  it('should throw error when cropHeight is Infinity', () => {
    expect(() => calculateCropY(100, Infinity, true)).to.throw();
  });
});
