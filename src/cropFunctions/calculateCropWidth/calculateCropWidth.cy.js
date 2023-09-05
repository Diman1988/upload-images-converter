import { calculateCropWidth } from './';

describe('calculateCropWidth', () => {
  it('should return the image width when image ratio is less than target ratio', () => {
    const result = calculateCropWidth(100, 200, 0.5, true);
    expect(result).to.equal(100);
  });

  it('should calculate the crop width based on height when image ratio is not less than target ratio', () => {
    const result = calculateCropWidth(200, 100, 2, false);
    expect(result).to.equal(200); // 100 * 2 = 200
  });

  it('should round the result when the calculated width is not an integer', () => {
    const result = calculateCropWidth(100, 333, 0.5, false);
    expect(result).to.equal(167); // 333 * 0.5 = 166.5
  });

  // Тесты на неверные входные данные
  it('should throw an error when imageWidth is negative', () => {
    expect(() => calculateCropWidth(-100, 200, 0.5, true)).to.throw();
  });

  it('should throw an error when imageHeight is negative', () => {
    expect(() => calculateCropWidth(100, -200, 0.5, true)).to.throw();
  });

  it('should throw an error when targetRatio is negative', () => {
    expect(() => calculateCropWidth(100, 200, -0.5, true)).to.throw();
  });

  it('should throw an error when any of the numeric inputs are NaN or Infinity', () => {
    expect(() => calculateCropWidth(NaN, 200, 0.5, true)).to.throw();
    expect(() => calculateCropWidth(100, Infinity, 0.5, true)).to.throw();
    expect(() => calculateCropWidth(100, 200, NaN, true)).to.throw();
  });

  it('should throw an error if isImageRatioLessThanTarget is not a boolean', () => {
    expect(() => calculateCropWidth(100, 200, 0.5, 'true')).to.throw();
    expect(() => calculateCropWidth(100, 200, 0.5, null)).to.throw();
  });
  // Дополнительные тесты:

  it('should return 0 when the image width is 0', () => {
    const result = calculateCropWidth(0, 200, 0.5, true);
    expect(result).to.equal(0);
  });

  it('should return 0 when the image height is 0', () => {
    const result = calculateCropWidth(100, 0, 0.5, false);
    expect(result).to.equal(0); // 0 * 0.5 = 0
  });

  it('should return image width when target ratio is 0 and isImageRatioLessThanTarget is true', () => {
    const result = calculateCropWidth(100, 200, 0, true);
    expect(result).to.equal(100);
  });

  it('should return 0 when target ratio is 0 and isImageRatioLessThanTarget is false', () => {
    const result = calculateCropWidth(100, 200, 0, false);
    expect(result).to.equal(0);
  });

  it('should handle cases where image and target have the same aspect ratio', () => {
    const result = calculateCropWidth(200, 100, 2, false);
    expect(result).to.equal(200); // 100 * 2 = 200
  });

  it('should handle fractional values correctly', () => {
    const result = calculateCropWidth(100, 333.333, 0.5, false);
    expect(result).to.equal(167); // 333.333 * 0.5 = 166.6665
  });
});
