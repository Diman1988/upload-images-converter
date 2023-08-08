import { calculateCropHeight } from './../../../../src/cropFunctions';

describe('calculateCropHeight', () => {
  it('should calculate height based on width when image ratio is less than target', () => {
    const result = calculateCropHeight(100, 200, 2, true);
    expect(result).to.equal(50); // 100 / 2 = 50
  });

  it('should return image height when image ratio is equal or greater than target', () => {
    const result = calculateCropHeight(100, 200, 0.5, false);
    expect(result).to.equal(200);
  });

  it('should return 0 for a zero image width', () => {
    const result = calculateCropHeight(0, 200, 1, true);
    expect(result).to.equal(0);
  });

  it('should handle very large image dimensions', () => {
    const result = calculateCropHeight(Number.MAX_SAFE_INTEGER, 1, 1, true);
    expect(result).to.equal(Number.MAX_SAFE_INTEGER);
  });

  it('should throw error when imageWidth is NaN', () => {
    expect(() => calculateCropHeight(NaN, 200, 1, true)).to.throw();
  });

  it('should throw error when imageHeight is NaN', () => {
    expect(() => calculateCropHeight(100, NaN, 1, true)).to.throw();
  });

  it('should throw error when targetRatio is NaN', () => {
    expect(() => calculateCropHeight(100, 200, NaN, true)).to.throw();
  });

  it('should throw error when isImageRatioLessThanTarget is not a boolean', () => {
    expect(() => calculateCropHeight(100, 200, 1, null)).to.throw();
    expect(() => calculateCropHeight(100, 200, 1, 'true')).to.throw();
  });

  it('should handle edge case when targetRatio is 0 (should return 0)', () => {
    const result = calculateCropHeight(100, 200, 0, true);
    expect(result).to.equal(0);
  });

  it('should handle edge case when targetRatio is very close to zero (should return a very large number)', () => {
    const result = calculateCropHeight(100, 200, 0.0000001, true);
    expect(result).to.be.above(1000000); // Just an example value, actual result could be different
  });

  it('should handle case when targetRatio is very large', () => {
    const result = calculateCropHeight(100, 200, 1000000, true);
    expect(result).to.be.closeTo(0, 0.1);
  });

  it('should throw error when imageWidth is negative', () => {
    expect(() => calculateCropHeight(-100, 200, 1, true)).to.throw();
  });

  it('should throw error when imageHeight is negative', () => {
    expect(() => calculateCropHeight(100, -200, 1, true)).to.throw();
  });

  it('should throw error when targetRatio is negative', () => {
    expect(() => calculateCropHeight(100, 200, -1, true)).to.throw();
  });
});
