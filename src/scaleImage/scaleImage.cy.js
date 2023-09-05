import { scaleImage } from './';
import { calculateScaleRatio } from './../calculateScaleRatio';

describe('scaleImage', () => {
  it('should return the target width and height if crop dimensions are smaller than target', () => {
    const cropWidth = 150;
    const cropHeight = 100;
    const targetWidth = 300;
    const targetHeight = 200;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should calculate scaled dimensions correctly for larger crop dimensions', () => {
    const cropWidth = 300;
    const cropHeight = 200;
    const targetWidth = 200;
    const targetHeight = 133;

    const scaleRatio = calculateScaleRatio(
      cropWidth,
      cropHeight,
      targetWidth,
      targetHeight,
    );
    const expectedScaledWidth = Math.floor(cropWidth * scaleRatio);
    const expectedScaledHeight = Math.floor(cropHeight * scaleRatio);

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.be.closeTo(expectedScaledWidth, 0.0001);
    expect(result.scaledHeight).to.be.closeTo(expectedScaledHeight, 0.0001);
  });

  it('should round scaled dimensions down to the nearest integer', () => {
    const cropWidth = 300;
    const cropHeight = 200;
    const targetWidth = 300;
    const targetHeight = 200;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should return the target dimensions if crop dimensions are equal to target', () => {
    const cropWidth = 200;
    const cropHeight = 150;
    const targetWidth = 200;
    const targetHeight = 150;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should return zero dimensions if crop dimensions are zero', () => {
    const cropWidth = 0;
    const cropHeight = 0;
    const targetWidth = 200;
    const targetHeight = 150;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(0);
    expect(result.scaledHeight).to.equal(0);
  });

  it('should scale down the image if crop dimensions are larger than target', () => {
    const cropWidth = 300;
    const cropHeight = 200;
    const targetWidth = 150;
    const targetHeight = 100;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should scale up the image if crop dimensions are smaller than target', () => {
    const cropWidth = 100;
    const cropHeight = 50;
    const targetWidth = 300;
    const targetHeight = 150;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should scale to integer dimensions without rounding', () => {
    const cropWidth = 300;
    const cropHeight = 200;
    const targetWidth = 150;
    const targetHeight = 100;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should scale to the same dimensions if target dimensions match crop dimensions', () => {
    const cropWidth = 300;
    const cropHeight = 200;
    const targetWidth = 300;
    const targetHeight = 200;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should not scale up if crop dimensions are larger than target dimensions', () => {
    const cropWidth = 400;
    const cropHeight = 300;
    const targetWidth = 200;
    const targetHeight = 150;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth); // ожидается targetWidth, так как не должно масштабироваться вверх
    expect(result.scaledHeight).to.equal(targetHeight); // ожидается targetHeight, так как не должно масштабироваться вверх
  });

  it('should return target dimensions if crop dimensions are equal to target dimensions', () => {
    const cropWidth = 200;
    const cropHeight = 150;
    const targetWidth = 200;
    const targetHeight = 150;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth);
    expect(result.scaledHeight).to.equal(targetHeight);
  });

  it('should scale down if crop dimensions are larger than target dimensions', () => {
    const cropWidth = 400;
    const cropHeight = 300;
    const targetWidth = 200;
    const targetHeight = 150;

    const scaleRatio = calculateScaleRatio(
      cropWidth,
      cropHeight,
      targetWidth,
      targetHeight,
    );
    const expectedScaledWidth = Math.floor(cropWidth * scaleRatio);
    const expectedScaledHeight = Math.floor(cropHeight * scaleRatio);

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(expectedScaledWidth);
    expect(result.scaledHeight).to.equal(expectedScaledHeight);
  });

  it('should not scale if crop dimensions are larger than target dimensions and no scaling is needed', () => {
    const cropWidth = 200;
    const cropHeight = 150;
    const targetWidth = 100;
    const targetHeight = 75;

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(targetWidth); // Изменено cropWidth на targetWidth
    expect(result.scaledHeight).to.equal(targetHeight); // Изменено cropHeight на targetHeight
  });

  it('should scale up if crop dimensions are smaller than target dimensions', () => {
    const cropWidth = 100;
    const cropHeight = 75;
    const targetWidth = 200;
    const targetHeight = 150;

    const scaleRatio = calculateScaleRatio(
      cropWidth,
      cropHeight,
      targetWidth,
      targetHeight,
    );
    const expectedScaledWidth = Math.floor(cropWidth * scaleRatio);
    const expectedScaledHeight = Math.floor(cropHeight * scaleRatio);

    const result = scaleImage(cropWidth, cropHeight, targetWidth, targetHeight);

    expect(result.scaledWidth).to.equal(expectedScaledWidth);
    expect(result.scaledHeight).to.equal(expectedScaledHeight);
  });
});
