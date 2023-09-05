import { calculateRatio } from './calculateRatio';

describe('calculateRatio', () => {
  it('should correctly calculate the aspect ratio for a square image', () => {
    const ratio = calculateRatio(100, 100);
    expect(ratio).to.equal(1);
  });

  it('should correctly calculate the aspect ratio for a wide image', () => {
    const ratio = calculateRatio(200, 100);
    expect(ratio).to.equal(2);
  });

  it('should correctly calculate the aspect ratio for a tall image', () => {
    const ratio = calculateRatio(100, 200);
    expect(ratio).to.equal(0.5);
  });

  it('should throw an error if any of the parameters are not positive numbers', () => {
    let errorCaught = false;
    try {
      calculateRatio(-1, 100);
    } catch (error) {
      errorCaught = true;
    }
    expect(errorCaught).to.be.true;
    errorCaught = false;
    try {
      calculateRatio(100, -1);
    } catch (error) {
      errorCaught = true;
    }
    expect(errorCaught).to.be.true;
  });
});
