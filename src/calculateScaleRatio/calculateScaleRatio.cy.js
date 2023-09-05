import { calculateScaleRatio } from './calculateScaleRatio';

const testCases = [
  {
    description: 'should return 0 for zero crop dimensions',
    cropWidth: 0,
    cropHeight: 0,
    targetWidth: 200,
    targetHeight: 150,
    expected: 0,
  },
  {
    description: 'should return 1 for the same dimensions',
    cropWidth: 200,
    cropHeight: 150,
    targetWidth: 200,
    targetHeight: 150,
    expected: 1,
  },
  {
    description: 'should return 0.75 for larger crop dimensions',
    cropWidth: 300,
    cropHeight: 200,
    targetWidth: 200,
    targetHeight: 150,
    expected: 0.75,
  },
  {
    description: 'should return 2 for smaller crop dimensions',
    cropWidth: 100,
    cropHeight: 75,
    targetWidth: 200,
    targetHeight: 150,
    expected: 2,
  },
  {
    description: 'should return 0.5 for different aspect ratios',
    cropWidth: 300,
    cropHeight: 200,
    targetWidth: 150,
    targetHeight: 100,
    expected: 0.5,
  },
  {
    description: 'should return 0 if one of the crop dimensions is zero',
    cropWidth: 0,
    cropHeight: 100,
    targetWidth: 200,
    targetHeight: 150,
    expected: 0,
  },
  {
    description: 'should return 0 if target dimensions are zero',
    cropWidth: 200,
    cropHeight: 150,
    targetWidth: 0,
    targetHeight: 0,
    expected: 0,
  },
  {
    description: 'should return 0 if one of the target dimensions is zero',
    cropWidth: 200,
    cropHeight: 150,
    targetWidth: 0,
    targetHeight: 100,
    expected: 0,
  },
  {
    description:
      'should return 0.01 for very small but non-zero target dimensions',
    cropWidth: 200,
    cropHeight: 150,
    targetWidth: 2,
    targetHeight: 1.5,
    expected: 0.01,
  },
];

describe('calculateScaleRatio', () => {
  testCases.forEach(
    ({
      description,
      cropWidth,
      cropHeight,
      targetWidth,
      targetHeight,
      expected,
    }) => {
      it(description, () => {
        const result = calculateScaleRatio(
          cropWidth,
          cropHeight,
          targetWidth,
          targetHeight,
        );
        expect(result).to.be.closeTo(expected, 0.0001);
      });
    },
  );
});
