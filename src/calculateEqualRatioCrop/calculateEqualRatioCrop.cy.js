import { calculateEqualRatioCrop } from './calculateEqualRatioCrop'; // Замените на путь к вашему модулю

describe('calculateEqualRatioCrop', () => {
  const testCases = [
    {
      description: 'for a square image',
      imageWidth: 500,
      imageHeight: 500,
      expected: {
        cropX: 0,
        cropY: 0,
        cropWidth: 500,
        cropHeight: 500,
      },
    },
    {
      description: 'for a rectangular image',
      imageWidth: 600,
      imageHeight: 400,
      expected: {
        cropX: 0,
        cropY: 0,
        cropWidth: 600,
        cropHeight: 400,
      },
    },
    {
      description: 'for zero dimensions',
      imageWidth: 0,
      imageHeight: 0,
      expected: {
        cropX: 0,
        cropY: 0,
        cropWidth: 0,
        cropHeight: 0,
      },
    },
  ];

  testCases.forEach(({ description, imageWidth, imageHeight, expected }) => {
    it(`should return the original dimensions ${description}`, () => {
      const result = calculateEqualRatioCrop(imageWidth, imageHeight);

      expect(result.cropX).to.equal(expected.cropX);
      expect(result.cropY).to.equal(expected.cropY);
      expect(result.cropWidth).to.equal(expected.cropWidth);
      expect(result.cropHeight).to.equal(expected.cropHeight);
    });
  });
});
